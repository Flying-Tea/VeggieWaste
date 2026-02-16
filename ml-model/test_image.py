import torch 
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# config
Model_Path = 'veggie_freshness.pth'
Image_Path = 'test_images/test_image.jpg'
Class_Names = ['fresh', 'rotten']

# load model

model = models.mobilenet_v3_small(pretrained=False)
model.classifier[3] = nn.Linear(model.classifier[3].in_features, len(Class_Names))

checkpoint = torch.load(Model_Path, map_location=torch.device('cpu'))
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

# image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])
# load and preprocess image
image = Image.open(Image_Path).convert('RGB')
input_tensor = transform(image).unsqueeze(0)

# inference
with torch.no_grad():
    output = model(input_tensor)
    probabilities = torch.softmax(output, dim=1)[0]

confidence, index = torch.max(probabilities, dim=0)
predicted_class = Class_Names[index]

# decision + output

print(f"Predicted Class: {predicted_class}")

if predicted_class == 'fresh' and confidence.item() >= 0.8:
    print(f"The vegetable is fresh with {confidence.item() * 100:.2f}% confidence.")
elif predicted_class == 'rotten' and confidence.item() >= 0.8:
    print(f"The vegetable is rotten with {confidence.item() * 100:.2f}% confidence.")
else:
    print(f"Uncertain prediction: {predicted_class} with {confidence.item() * 100:.2f}% confidence.")
