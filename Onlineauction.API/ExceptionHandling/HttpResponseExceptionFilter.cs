﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using OnlineAuction.Common.Exceptions;

namespace OnlineAuction.Api.ExceptionHandling
{
    public class HttpResponseExceptionFilter : IActionFilter
    {
        private readonly ILogger<HttpResponseExceptionFilter> _logger;

        public HttpResponseExceptionFilter(ILogger<HttpResponseExceptionFilter> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is null)
                return;

            if (context.Exception is HttpResponseException exception)
            {
                context.Result = new ObjectResult(exception.Message)
                {
                    StatusCode = (int)exception.StatusCode
                };
                context.ExceptionHandled = true;
            }

            if (context.Exception is BadRequestException brException)
            {
                _logger.LogWarning("User made a bad request, received message: {Message}", brException.Message);
            }
            else if (context.Exception is NotFoundException nfException)
            {
                _logger.LogWarning("Data requested by user was not found, message: {Message}", nfException.Message);
            }
            else
            {
                _logger.LogError(context.Exception, context.Exception.Message);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context) { }
    }
}
