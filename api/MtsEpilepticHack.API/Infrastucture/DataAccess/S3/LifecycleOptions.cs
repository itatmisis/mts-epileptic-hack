namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public class LifecycleOptions
{
    public LifecycleOptions()
    {
    }

    public LifecycleOptions(string lifecycleName)
        => LifecycleName = lifecycleName;

    /// <summary>
    /// The name of lifecycle. Also is used in urls as prefix
    /// </summary>
    public string LifecycleName { get; init; } = null!;

    /// <summary>
    /// Sets the quantity of days the file's being kept in storage
    /// </summary>
    public int LifecycleDeadlineDays { get; init; } = 14;
}

