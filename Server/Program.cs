using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Access-Control-Allow-Origin",
        policy =>
        {
            policy.WithOrigins("*").AllowAnyHeader()
                                 .AllowAnyMethod();
        });
    options.AddPolicy("Access-Control-Allow-Methods",
         policy =>
         {
             policy.WithOrigins("*")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
         });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
