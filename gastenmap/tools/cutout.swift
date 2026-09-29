// Usage: swift cutout.swift <in.jpg> <out.png> [rotateDegreesCCW] [maxSide] [exposureEV]
// Lifts the foreground subject (macOS Vision), crops to it, optional rotation, resize and
// brightening (evening photos come out grey; 0.4-0.6 EV makes white plastic white again).
// Example: swift tools/cutout.swift assets/images/airco.jpg assets/images/apparaten/airco.png 90 1600 0.5
import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let rotate = args.count > 3 ? Double(args[3])! : 0
let maxSide = args.count > 4 ? Double(args[4])! : 1600
let ev = args.count > 5 ? Float(args[5])! : 0

var input = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true])!
if rotate != 0 {
    input = input.transformed(by: CGAffineTransform(rotationAngle: rotate * .pi / 180))
    input = input.transformed(by: CGAffineTransform(translationX: -input.extent.minX, y: -input.extent.minY))
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: input)
try handler.perform([request])
guard let result = request.results?.first else { fatalError("no subject found") }
let buffer = try result.generateMaskedImage(ofInstances: result.allInstances, from: handler, croppedToInstancesExtent: true)
var out = CIImage(cvPixelBuffer: buffer)

let scale = min(1, maxSide / max(out.extent.width, out.extent.height))
if scale < 1 {
    let f = CIFilter.lanczosScaleTransform()
    f.inputImage = out; f.scale = Float(scale); f.aspectRatio = 1
    out = f.outputImage!
}
if ev != 0 {
    let f = CIFilter.exposureAdjust()
    f.inputImage = out; f.ev = ev
    out = f.outputImage!
}
let ctx = CIContext()
try ctx.writePNGRepresentation(of: out, to: outURL, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
print("wrote \(outURL.path) \(Int(out.extent.width))x\(Int(out.extent.height))")
