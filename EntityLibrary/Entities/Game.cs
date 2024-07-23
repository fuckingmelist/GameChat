﻿using System;
using System.Collections.Generic;

namespace Server.Entities;

public partial class Game
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? AvgRating { get; set; }

    public byte[]? Picture { get; set; }

    public string? Date { get; set; }

    public virtual ICollection<Theme> Themes { get; set; } = new List<Theme>();
}
