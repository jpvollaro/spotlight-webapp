using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Optum.PaymentIntegrity.SpotlightApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly ILogger<MovieController> logger;

        public List<Movie> movieList = new List<Movie>()
        {
            new Movie("Rocky",
                "A small-time boxer gets a supremely rare chance to fight a heavy-weight champion in a bout in which he strives to go the distance for his self-respect.",
                1979, "Drama, Sport", 5),
            new Movie("Spotlight",
                "The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",
                2015, "Biography, Crime, Drama", 4),
             new Movie("Airplane",
                "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
                1980, "Comedy", 3),
             new Movie("Ghostbusters",
                 "Three former parapsychology professors set up shop as a unique ghost removal service.",
                1984, "Action, Comedy, Fantasy", 3),
             new Movie("Deadpool",
                "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
                2016, "Action, Adventure, Comedy", 2),
             new Movie("Iron Man",
                "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil",
                2008, "Action, Adventure, Sci-Fi", 4),
            new Movie("Say Anything",
                "A noble underachiever and a beautiful valedictorian fall in love the summer before she goes off to college. ",
                1989, "Romance, Comedy", 1),
            new Movie("The Birds",
                "A wealthy San Francisco socialite pursues a potential boyfriend to a small Northern California town that slowly takes a turn for the bizarre when birds of all kinds suddenly begin to attack people.",
                1963, "Drama, Horror, Mystery", 1),
            new Movie("The Godfather",
                "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                1972, "Crime,Drama",5),
            new Movie("The Verdict",
                "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                1982, "Drama, Legal",2),
        };

        public MovieController(ILogger<MovieController> logger)
        {
            this.logger = logger;

        }

        /// <summary>
        /// Get this instance.
        /// </summary>
        /// <returns>The get.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(Result), 200)]
        public async Task<Result> Get()
        {
            logger.LogInformation("Testing the MovieController");
            return await Task.FromResult(
                new Result() { 
                    Movies = movieList
                });
        }
    }

    public class Result
    {
        public List<Movie> Movies { get; set; }
    }

    public class Movie
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public uint year { get; set; }
        public string genre { get; set; }
        public int rating { get; set; }

        public Movie(string Name, string Description, uint Year, string Genre, int Rating)
        {
            id = Guid.NewGuid();
            name = Name;
            description = Description;
            year = Year;
            genre = Genre;
            rating = Rating;
        }
    }
}