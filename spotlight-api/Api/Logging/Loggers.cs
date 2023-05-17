namespace Optum.PaymentIntegrity.SpotlightApi.Api.Logging
{
    //Using marker classes is generally a code smell and bad practice.
    //We need to use these (at least for the time being) in this instance since
    //Microsoft's ILogger uses the generic type passed in to create a new named logger.

    public sealed class ApplicationLogger { }

    public sealed class AuditLogger { }
}
