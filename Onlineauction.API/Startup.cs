using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using OnlineAuction.Api.Authentication;
using OnlineAuction.Api.ExceptionHandling;
using OnlineAuction.Api.Extensions;
using OnlineAuction.Bll.AuctionService;
using OnlineAuction.Bll.AuthenticationService;
using OnlineAuction.Bll.Hubs;
using OnlineAuction.Common.Options;
using OnlineAuction.Common.RequestContext;
using OnlineAuction.Dal;
using AuthenticationOptions = OnlineAuction.Common.Options.AuthenticationOptions;

namespace OnlineAuction.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
        {
            _configuration = configuration;
            _environment = hostEnvironment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionStringOptions = services.ConfigureOption<ConnectionStringOptions>(_configuration);

            services.Configure<AuthenticationOptions>(_configuration.GetSection(nameof(AuthenticationOptions)));

            services.AddHttpContextAccessor();
            services.AddSignalR();

            services.AddControllers(options =>
            {
                options.Filters.Add<HttpResponseExceptionFilter>();
            });

            // For SignalR
            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000")
                        .AllowCredentials();
                });
            });

            services.AddSwaggerDocument();
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "wwwroot");
            services.AddHttpContextAccessor();

            services.AddAuthentication(AuthenticationSchemes.JwtBearer)
                .AddScheme<AuthenticationSchemeOptions, JwtBearerAuthenticationHandler>(AuthenticationSchemes.JwtBearer, null);

            services.AddAuthorization();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAuctionService, AuctionService>();
            services.AddScoped<IRequestContext, RequestContext.RequestContext>();

            services.AddDAL(connectionStringOptions);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseOpenApi();
                app.UseSwaggerUi3();
            }

            app.UseCors("ClientPermission");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<AuctionHub>("/hubs/auctionHub");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../OnlineAuction.Web";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}
