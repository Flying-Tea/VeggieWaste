import torch
import torch.nn as nn
from torchvision import models

# Open Neural Network Exchange (ONNX) export script for the trained model
# This allows me to run it without PyTorch in other environments, such as mobile or web
# In my case, I will be using it in my backend API to serve predictions without needing the full PyTorch library

# config
Model_Path = 'veggie_freshness.pth'
Onnx_Path = 'veggie_freshness.onnx'
num_classes = 2

# load model
model = models.mobilenet_v3_small(pretrained=False)
model.classifier[3] = nn.Linear(model.classifier[3].in_features, num_classes)

checkpoint = torch.load(Model_Path, map_location=torch.device('cpu'))
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

# dummy input for ONNX export
dummy_input = torch.randn(1, 3, 224, 224)

# export to ONNX
torch.onnx.export(
    model,
    dummy_input,
    Onnx_Path,
    export_params=True,
    opset_version=12,
    do_constant_folding=True,
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={
        "input": {0: "batch_size"},
        "output": {0: "batch_size"},
    }
)

print(f"Model exported to {Onnx_Path} successfully.")