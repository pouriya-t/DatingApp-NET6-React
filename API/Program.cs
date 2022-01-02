using API.Middleware;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;




// Add services to the container.

services.AddApplicationServices(builder.Configuration);
services.AddControllers();
services.AddCors();
services.AddIdentityServices(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();

services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt auth header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    // Notice : in swagger should be write ---> Bearer eyJhbG.......
    // That is important that we write the word Bearer before our token .
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
         {
             new OpenApiSecurityScheme
             {
                 Reference = new OpenApiReference
                 {
                     Type=ReferenceType.SecurityScheme,
                     Id ="Bearer"
                 },
                 Scheme = "oauth32",
                 Name = "Bearer",
                 In = ParameterLocation.Header
             },
             new List<string>()
         }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors(x =>
    x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
            .WithOrigins("http://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed Data Start
using var scope = app.Services.CreateScope();
var servicesBuilder = scope.ServiceProvider;

try
{
    using var context = servicesBuilder.GetRequiredService<DataContext>();
    var userManager = servicesBuilder.GetRequiredService<UserManager<AppUser>>();
    var roleManager = servicesBuilder.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager, roleManager);

}
catch (Exception ex)
{
    var logger = servicesBuilder.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migrations");
}

// Seed Data End


app.Run();
