using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DNT
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class RequiresClaimAttibute : Attribute, IAuthorizationFilter
    {
        private readonly string _claimName;
        private readonly string _claimValue;

        public RequiresClaimAttibute(string claimName, string claimValue)
        {
            _claimName = claimName;
            _claimValue = claimValue;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.User.HasClaim(_claimName, _claimValue))
            {
                context.Result = new ForbidResult();
            }

            var authorizationHeader = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            string token;

            if (authorizationHeader?.StartsWith("Bearer ") == true)
            {
                token = authorizationHeader.Substring("Bearer ".Length).Trim();
            }


        }
    }
}
