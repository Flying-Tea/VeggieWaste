using app.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(new VeggieClassification("Models/veggie_freshness.onnx"));

builder.Services.AddControllers();
var app = builder.Build();

// Fix this future me
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("frontend", policy =>
//     {
//         policy.AllowAnyOrigin() // Vite dev server
//         .AllowAnyHeader()
//         .AllowAnyMethod();
//     });
// });

app.UseCors("frontend");
app.MapControllers();
app.Run();
