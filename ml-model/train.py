import torch
import torch.nn as nn
from torchvision import transforms, models, datasets
from torch.utils.data import DataLoader, random_split

# config
Dataset_Dir = 'dataset'
Num_Classes = 2
Epochs = 12
Batch_Size = 32
Learning_Rate = 0.01
Train_Split = 0.8 

# Transform images for data augmentation and normalization
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

val_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# dataset + loaders
dataset = datasets.ImageFolder(Dataset_Dir, transform=train_transform)

train_size = int(Train_Split * len(dataset))
val_size = len(dataset) - train_size

train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

val_dataset.dataset.transform = val_transform
train_loader = DataLoader(train_dataset, batch_size=Batch_Size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=Batch_Size, shuffle=False)

# confirm dataset
print("Classes:", dataset.classes)
print(f"Training images: {train_size}")
print(f"Validation images: {val_size}")

# model
model = models.mobilenet_v3_small(pretrained=True)

for param in model.parameters():
    param.requires_grad = False

for param in model.features[-2].parameters():
    param.requires_grad = True

model.classifier[3] = nn.Linear(model.classifier[3].in_features, Num_Classes)

# training setup
criteration = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=Learning_Rate)

# training loop
for epoch in range(Epochs):
    model.train()
    total_loss = 0
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criteration(outputs, labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{Epochs}], Loss: {avg_loss:.4f}")

    # validation
    model.eval()
    correct, total = 0, 0
    with torch.no_grad():
        for images, labels in val_loader:
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    accuracy = correct / total * 100
    print(f"Validation Accuracy: {accuracy:.2f}%")

# save model
torch.save({'model_state_dict': model.state_dict(), "class_names": dataset.classes}, 'veggie_freshness.pth')