using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data;
using ReviewAppProject.Data.Repository;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment;

var connectionString = builder.Configuration.GetConnectionString("SqlServer") ??
    throw new InvalidOperationException("Connection string 'SqlServer' not found.");
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(connectionString));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<FacultyRepository>();
builder.Services.AddScoped<ProfessorRepository>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});

builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.MapControllers();

app.Run();
