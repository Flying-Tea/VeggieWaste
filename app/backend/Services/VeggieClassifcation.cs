using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace app.Backend.Services
{
    public class VeggieClassification
    {
        private readonly InferenceSession _session;
        private readonly string[] _classes = { "fresh", "rotten" };

        // ImageNet normalization (MUST match training)
        private readonly float[] mean = { 0.485f, 0.456f, 0.406f };
        private readonly float[] std = { 0.229f, 0.224f, 0.225f };

        public VeggieClassification(string modelPath)
        {
            _session = new InferenceSession(modelPath);
        }

        public (string label, float confidence) ClassifyVeggie(Image<Rgb24> image)
        {
            image.Mutate(x => x.Resize(224, 224));

            var input = new DenseTensor<float>(new[] { 1, 3, 224, 224 });

            for (int y = 0; y < 224; y++)
            {
                for (int x = 0; x < 224; x++)
                {
                    var pixel = image[x, y];

                    input[0, 0, y, x] = ((pixel.R / 255f) - mean[0]) / std[0];
                    input[0, 1, y, x] = ((pixel.G / 255f) - mean[1]) / std[1];
                    input[0, 2, y, x] = ((pixel.B / 255f) - mean[2]) / std[2];
                }
            }

            var inputs = new List<NamedOnnxValue>
            {
                NamedOnnxValue.CreateFromTensor("input", input)
            };

            using var results = _session.Run(inputs);
            var logits = results.First().AsEnumerable<float>().ToArray();

            var exp = logits.Select(MathF.Exp).ToArray();
            var sum = exp.Sum();
            var probs = exp.Select(v => v / sum).ToArray();

            int index = Array.IndexOf(probs, probs.Max());

            return (_classes[index], probs[index]);
        }
    }
}