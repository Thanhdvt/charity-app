using DNT;
using DNT.Domain;
using DNT.Domain.Common;
using DNT.Domain.Service;
using DNT.Infrastructure;
using DNT.Infrastructure.Repository;
using DNT.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var conectionString = builder.Configuration["ConnectionString"];
var serverVersion = new MariaDbServerVersion(new Version(10, 5, 23));


// Add controllers
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Connect DB, create dbcontext for efcore
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseMySql(conectionString, serverVersion)
    );

// User DI
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();

// ForHelpRequest
builder.Services.AddScoped<IForHelpRequestRepository, ForHelpRequestRepository>();
builder.Services.AddScoped<ForHelpRequestService, ForHelpRequestService>();

// Event
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<EventService, EventService>();

// Comment
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService, CommentService>();

// EventLike DI
builder.Services.AddScoped<IEventLikeRepository, EventLikeRepository>();
builder.Services.AddScoped<EventLikeService, EventLikeService>();

// Auth DI
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<LoginService, LoginService>();

// Volunteer DI
builder.Services.AddScoped<IVolunteerRepository, VolunteerRepository>();
builder.Services.AddScoped<VolunteerService, VolunteerService>();

// EventRegist DI   
builder.Services.AddScoped<IEventRegistRepository, EventRegistRepository>();
builder.Services.AddScoped<EventRegistService, EventRegistService>();

// CharityOrganization DI
builder.Services.AddScoped<ICharityOrganizationRepository, CharityOrganizationRepository>();
builder.Services.AddScoped<CharityOrganizationService, CharityOrganizationService>();

// JoinRequest DI
builder.Services.AddScoped<IJoinRequestRepository, JoinRequestRepository>();
builder.Services.AddScoped<JoinRequestService, JoinRequestService>();

// IsMember DI
builder.Services.AddScoped<IIsMemberRepository, IsMemberRepository>();

// StatisticalReport DI
builder.Services.AddScoped<IStatisticalReportRepository, StatisticalReportRepository>();
builder.Services.AddScoped<StatisticalReportService, StatisticalReportService>();

// EventResponse DI
builder.Services.AddScoped<IEventResponseRepository, EventResponseRepository>();
builder.Services.AddScoped<EventResponseService, EventResponseService>();

// UserSessionState
builder.Services.AddScoped<UserSessionState, UserSessionState>();

// Auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.Events = new JwtBearerEvents()
    {
        OnTokenValidated = context =>
        {
            var userSessionState = context.HttpContext.RequestServices.GetRequiredService<UserSessionState>();

            var claims = context.Principal?.Claims;

            var userName = claims?.FirstOrDefault(c => c.Type == "name");

            var userId = claims?.FirstOrDefault(c => c.Type == "user_id");


            if (userName != null)
            {
                userSessionState.Name = userName.Value;
            }

            if (userId != null)
            {
                userSessionState.Id = Guid.Parse(userId.Value);
            }

            return Task.CompletedTask;
        }
    };
});
builder.Services.AddAuthorization();
builder.Services.ConfigureOptions<JwtOptionsSetup>();
builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");
//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseMiddleware<ExceptionMiddleware>();

app.Run();
