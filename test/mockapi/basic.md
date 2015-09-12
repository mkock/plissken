# Numbers [/numbers]

+ Model (application/json)

  [{"value": 1}, {"value": 2}, {"value": 3}, {"value": 4}, {"value": 5}, {"value": 6}, {"value": 7}, {"value": 8}, {"value": 9}, {"value": 10}]
  
# Retrieve [GET]

+ Response 200

  [Numbers][]

# Movies1 [/movies/page/1]

+ Parameters

  + Page (number, optional) - Page number

+ Model (application/json)

  {
    "meta": {
      "page": 1,
      "pages": 3
    },
    "movies": [
      {
        "id": 1,
        "title": "Die Hard - With A Vengeance",
        "year": 1995,
        "actors": ["Bruce Willis", "Jeremy Irons", "Samuel L. Jackson"],
        "storyline": "John McClane is now almost a full-blown alcoholic and is suspended from the NYPD. But when a bomb goes off in the Bonwit Teller Department Store the police go insane trying to figure out what's going on.",
        "imdbScore": 7.6
      },
      {
        "id": 2,
        "title": "Pulp Fiction",
        "year": 1994,
        "actors": ["Tim Roth", "Amanda Plummer", "Laura Lovelace", "John Travolta", "Samuel L. Jackson", "Bruce Willis", "Ving Rhames", "Uma Thurman"],
        "storyline": "Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace.",
        "imdbScore": 8.9
      },
      {
        "id": 3,
        "title": "Inside Man",
        "year": 2006,
        "actors": ["Denzel Washington", "Clive Oven", "Jodie Foster", "Christopher Plummer", "Willem Dafoe"],
        "storyline": "From a cell, a man tells us he has planned the perfect bank robbery; he invites us to watch.",
        "imdbScore": 7.6
      },
      {
        "id": 4,
        "title": "L.A. Confidential",
        "year": 1997,
        "actors": ["Kevin Spacey", "Russell Crowe", "Guy Pearce", "James Cromwell", "Kim Basinger", "Danny DeVito"],
        "storyline": "1950's Los Angeles is the seedy backdrop for this intricate noir-ish tale of police corruption and Hollywood sleaze.",
        "imdbScore": 8.3
      },
      {
        "id": 5,
        "title": "Rocky",
        "year": 1976,
        "actors": ["Sylvester Stallone", "Talia Shire", "Burt Young", "Carl Weathers"],
        "storyline": "Rocky Balboa is a struggling boxer trying to make the big time, working as a debt collector for a pittance.",
        "imdbScore": 8.1
      },
      {
        "id": 6,
        "title": "Gladiator",
        "year": 2000,
        "actors": ["Russell Crowe, Joaquin Phoenix", "Connie Nielsen"],
        "storyline": "Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Before his death, the Emperor chooses Maximus to be his heir over his own son, Commodus, and a power struggle leaves Maximus and his family condemned to death.",
        "imdbScore": 8.5
      }
    ]
  }

# Retrieve [GET]

+ Response 200

  [Movies1][]

# Movies2 [/movies/page/2]

+ Parameters

  + Page (number, optional) - Page number

+ Model (application/json)

  {
    "meta": {
      "page": 2,
      "pages": 3
    },
    "movies": [
      {
        "id": 7,
        "title": "HEAT",
        "year": 1995,
        "actors": ["Al Pacino", "Robert De Niro", "Val Kilmer", "Jon Voight", "Tom Sizemore"],
        "storyline": "Hunters and their prey--Neil and his professional criminal crew hunt to score big money targets (banks, vaults, armored cars) and are, in turn, hunted by Lt. Vincent Hanna and his team of cops in the Robbery/Homicide police division.",
        "imdbScore": 8.3
      },
      {
        "id": 8,
        "title": "Troy",
        "year": 2004,
        "actors": ["Julian Glover", "Brian Cox", "Brad Pitt", "Diane Kruger", "Eric Bana", "Orlando Bloom"],
        "storyline": "It is the year 1250 B.C. during the late Bronze age. Two emerging nations begin to clash after Paris, the Trojan prince, convinces Helen, Queen of Sparta, to leave her husband, Menelaus, and sail with him back to Troy.",
        "imdbScore": 7.2
      },
      {
        "id": 9,
        "title": "12 Years a Slave",
        "year": 2013,
        "actors": ["Chiwetel Ejiofor", "Dwight Henry", "Kelsey Scott"],
        "storyline": "Based on an incredible true story of one man's fight for survival and freedom.",
        "imdbScore": 8.1
      },
      {
        "id": 10,
        "title": "Inglorious Basterds",
        "year": 2009,
        "actors": ["Brad Pitt", "Melanie Laurent", "Christoph Waltz", "Eli Roth", "Michael Fassbender", "Diane Kruger"],
        "storyline": "In Nazi-occupied France, young Jewish refugee Shosanna Dreyfus witnesses the slaughter of her family by Colonel Hans Landa.",
        "imdbScore": 8.3
      },
      {
        "id": 11,
        "title": "Mr & Mrs Smith",
        "year": 2005,
        "actors": ["Brad Pitt", "Angelina Jolie", "Vince Vaughn"],
        "storyline": "John and Jane Smith are a normal married couple, living a normal life in a normal suburb, working normal jobs...well, if you can call secretly being assassins \"normal\".",
        "imdbScore": 6.5
      },
      {
        "id": 12,
        "title": "The Birds",
        "year": 1963,
        "actors": ["Rod Taylor", "Tippi Hedren", "Suzanne Pleshette"],
        "storyline": "Melanie Daniels is the modern rich socialite, part of the jet-set who always gets what she wants. When lawyer Mitch Brenner sees her in a pet shop, he plays something of a practical joke on her, and she decides to return the favor.",
        "imdbScore": 7.8
      }
    ]
  }

# Retrieve [GET]

+ Response 200

  [Movies2][]

# Movies3 [/movies/page/3]

+ Parameters

  + Page (number, optional) - Page number

+ Model (application/json)

  {
    "meta": {
      "page": 3,
      "pages": 3
    },
    "movies": [
      {
        "id": 13,
        "title": "Guardians of the Galaxy",
        "year": 2014,
        "actors": ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper"],
        "storyline": "After stealing a mysterious orb in the far reaches of outer space, Peter Quill from Earth, is now the main target of a manhunt led by the villain known as Ronan the Accuser.",
        "imdbScore": 8.1
      },
      {
        "id": 14,
        "title": "Spider-Man",
        "year": 2002,
        "actors": ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe", "James Franco"],
        "storyline": "Based on Marvel Comics' superhero character, this is a story of Peter Parker who is a nerdy high-schooler.",
        "imdbScore": 7.3
      },
      {
        "id": 15,
        "title": "Star Wars: Episode IV - A New Hope",
        "year": 1977,
        "actors": ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
        "storyline": "A young boy from Tatooine sets out on an adventure with an old Jedi named Obi-Wan Kenobi as his mentor to save Princess Leia from the ruthless Darth Vader and Destroy the Death Star built by the Empire which has the power to destroy the entire galaxy.",
        "imdbScore": 8.7
      },
      {
        "id": 16,
        "title": "The Godfather",
        "year": 1972,
        "actors": ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
        "storyline": "When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.",
        "imdbScore": 9.2
      },
      {
        "id": 17,
        "title": "The Dark Knight",
        "year": 2008,
        "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal", "Gary Oldman", "Morgan Freeman"],
        "storyline": "Batman raises the stakes in his war on crime.",
        "imdbScore": 9.0
      }
    ]
  }

# Retrieve [GET]

+ Response 200

  [Movies3][]

# Movie1 [/movies/1]

+ Model (application/json)

  {
    "id": 1,
    "title": "Die Hard - With A Vengeance",
    "year": 1995,
    "actors": ["Bruce Willis", "Jeremy Irons", "Samuel L. Jackson"],
    "storyline": "John McClane is now almost a full-blown alcoholic and is suspended from the NYPD. But when a bomb goes off in the Bonwit Teller Department Store the police go insane trying to figure out what's going on.",
    "imdbScore": 7.6,
    "genres": ["Action", "Adventure", "Thriller"],
    "runtime": 131
  }

# Retrieve [GET]

+ Response 200

  [Movie1][]

# Movie2 [/movies/2]

+ Model (application/json)

  {
    "id": 2,
    "title": "Pulp Fiction",
    "year": 1994,
    "actors": ["Tim Roth", "Amanda Plummer", "Laura Lovelace", "John Travolta", "Samuel L. Jackson", "Bruce Willis", "Ving Rhames", "Uma Thurman"],
    "storyline": "Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace.",
    "imdbScore": 8.9,
    "genres": ["Crime", "Drama"],
    "runtime": 154
  }

# Retrieve [GET]

+ Response 200

  [Movie2][]

# Movie3 [/movies/3]

+ Model (application/json)

  {
    "id": 3,
    "title": "Inside Man",
    "year": 2006,
    "actors": ["Denzel Washington", "Clive Oven", "Jodie Foster", "Christopher Plummer", "Willem Dafoe"],
    "storyline": "From a cell, a man tells us he has planned the perfect bank robbery; he invites us to watch.",
    "imdbScore": 7.6,
    "genres": ["Crime", "Drama", "Mystery", "Thriller"],
    "runtime": 129
  }

# Retrieve [GET]

+ Response 200

  [Movie3][]

# Movie4 [/movies/4]

+ Model (application/json)

  {
    "id": 4,
    "title": "L.A. Confidential",
    "year": 1997,
    "actors": ["Kevin Spacey", "Russell Crowe", "Guy Pearce", "James Cromwell", "Kim Basinger", "Danny DeVito"],
    "storyline": "1950's Los Angeles is the seedy backdrop for this intricate noir-ish tale of police corruption and Hollywood sleaze.",
    "imdbScore": 8.3,
    "genres": ["Crime", "Drama", "Mystery", "Thriller"],
    "runtime": 138
  }

# Retrieve [GET]

+ Response 200

  [Movie4][]

# Movie5 [/movies/5]

+ Model (application/json)

  {
    "id": 5,
    "title": "Rocky",
    "year": 1976,
    "actors": ["Sylvester Stallone", "Talia Shire", "Burt Young", "Carl Weathers"],
    "storyline": "Rocky Balboa is a struggling boxer trying to make the big time, working as a debt collector for a pittance.",
    "imdbScore": 8.1,
    "genres": ["Drama", "Sport"],
    "runtime": 119
  }

# Retrieve [GET]

+ Response 200

  [Movie5][]

# Movie6 [/movies/6]

+ Model (application/json)

  {
    "id": 6,
    "title": "Gladiator",
    "year": 2000,
    "actors": ["Russell Crowe, Joaquin Phoenix", "Connie Nielsen"],
    "storyline": "Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Before his death, the Emperor chooses Maximus to be his heir over his own son, Commodus, and a power struggle leaves Maximus and his family condemned to death.",
    "imdbScore": 8.5,
    "genres": ["Action", "Drama"],
    "runtime": 155
  }

# Retrieve [GET]

+ Response 200

  [Movie6][]

# Movie7 [/movies/7]

+ Model (application/json)

  {
    "id": 7,
    "title": "HEAT",
    "year": 1995,
    "actors": ["Al Pacino", "Robert De Niro", "Val Kilmer", "Jon Voight", "Tom Sizemore"],
    "storyline": "Hunters and their prey--Neil and his professional criminal crew hunt to score big money targets (banks, vaults, armored cars) and are, in turn, hunted by Lt. Vincent Hanna and his team of cops in the Robbery/Homicide police division.",
    "imdbScore": 8.3,
    "genres": ["Action", "Crime", "Drama", "Thriller"],
    "runtime": 170
  }

# Retrieve [GET]

+ Response 200

  [Movie7][]

# Movie8 [/movies/8]

+ Model (application/json)

  {
    "id": 8,
    "title": "Troy",
    "year": 2004,
    "actors": ["Julian Glover", "Brian Cox", "Brad Pitt", "Diane Kruger", "Eric Bana", "Orlando Bloom"],
    "storyline": "It is the year 1250 B.C. during the late Bronze age. Two emerging nations begin to clash after Paris, the Trojan prince, convinces Helen, Queen of Sparta, to leave her husband, Menelaus, and sail with him back to Troy.",
    "imdbScore": 7.2,
    "genres": ["Adventure"],
    "runtime": 163
  }

# Retrieve [GET]

+ Response 200

  [Movie8][]

# Movie9 [/movies/9]

+ Model (application/json)

  {
    "id": 9,
    "title": "12 Years a Slave",
    "year": 2013,
    "actors": ["Chiwetel Ejiofor", "Dwight Henry", "Kelsey Scott"],
    "storyline": "Based on an incredible true story of one man's fight for survival and freedom.",
    "imdbScore": 8.1,
    "genres": ["Biography", "Drama", "History"],
    "runtime": 134
  }

# Retrieve [GET]

+ Response 200

  [Movie9][]

# Movie10 [/movies/10]

+ Model (application/json)

  {
    "id": 10,
    "title": "Inglorious Basterds",
    "year": 2009,
    "actors": ["Brad Pitt", "Melanie Laurent", "Christoph Waltz", "Eli Roth", "Michael Fassbender", "Diane Kruger"],
    "storyline": "In Nazi-occupied France, young Jewish refugee Shosanna Dreyfus witnesses the slaughter of her family by Colonel Hans Landa.",
    "imdbScore": 8.3,
    "genres": ["Adventure", "Drama", "War"],
    "runtime": 153
  }

# Retrieve [GET]

+ Response 200

  [Movie10][]

# Movie11 [/movies/11]

+ Model (application/json)

  {
    "id": 11,
    "title": "Mr & Mrs Smith",
    "year": 2005,
    "actors": ["Brad Pitt", "Angelina Jolie", "Vince Vaughn"],
    "storyline": "John and Jane Smith are a normal married couple, living a normal life in a normal suburb, working normal jobs...well, if you can call secretly being assassins \"normal\".",
    "imdbScore": 6.5,
    "genres": ["Action", "Crime", "Romance", "Comedy", "Thriller"],
    "runtime": 120
  }

# Retrieve [GET]

+ Response 200

  [Movie11][]

# Movie12 [/movies/12]

+ Model (application/json)

  {
    "id": 12,
    "title": "The Birds",
    "year": 1963,
    "actors": ["Rod Taylor", "Tippi Hedren", "Suzanne Pleshette"],
    "storyline": "Melanie Daniels is the modern rich socialite, part of the jet-set who always gets what she wants. When lawyer Mitch Brenner sees her in a pet shop, he plays something of a practical joke on her, and she decides to return the favor.",
    "imdbScore": 7.8,
    "genres": ["Horror"],
    "runtime": 119
  }

# Retrieve [GET]

+ Response 200

  [Movie12][]

# Movie13 [/movies/13]

+ Model (application/json)

  {
    "id": 13,
    "title": "Guardians of the Galaxy",
    "year": 2014,
    "actors": ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper"],
    "storyline": "After stealing a mysterious orb in the far reaches of outer space, Peter Quill from Earth, is now the main target of a manhunt led by the villain known as Ronan the Accuser.",
    "imdbScore": 8.1,
    "genres": ["Action", "Adventure", "Sci-Fi"],
    "runtime": 121
  }

# Retrieve [GET]

+ Response 200

  [Movie13][]

# Movie14 [/movies/14]

+ Model (application/json)

  {
    "id": 14,
    "title": "Spider-Man",
    "year": 2002,
    "actors": ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe", "James Franco"],
    "storyline": "Based on Marvel Comics' superhero character, this is a story of Peter Parker who is a nerdy high-schooler.",
    "imdbScore": 7.3,
    "genres": ["Action", "Adventure"],
    "runtime": 121
  }

# Retrieve [GET]

+ Response 200

  [Movie14][]

# Movie15 [/movies/15]

+ Model (application/json)

  {
    "id": 15,
    "title": "Star Wars: Episode IV - A New Hope",
    "year": 1977,
    "actors": ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    "storyline": "A young boy from Tatooine sets out on an adventure with an old Jedi named Obi-Wan Kenobi as his mentor to save Princess Leia from the ruthless Darth Vader and Destroy the Death Star built by the Empire which has the power to destroy the entire galaxy.",
    "imdbScore": 8.7,
    "genres": ["Action", "Adventure", "Sci-Fi", "Fantasy"],
    "runtime": 121
  }

# Retrieve [GET]

+ Response 200

  [Movie15][]

# Movie16 [/movies/16]

+ Model (application/json)

  {
    "id": 16,
    "title": "The Godfather",
    "year": 1972,
    "actors": ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    "storyline": "When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.",
    "imdbScore": 9.2,
    "genres": ["Crime", "Drama"],
    "runtime": 175
  }

# Retrieve [GET]

+ Response 200

  [Movie16][]

# Movie17 [/movies/17]

+ Model (application/json)

  {
    "id": 17,
    "title": "The Dark Knight",
    "year": 2008,
    "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal", "Gary Oldman", "Morgan Freeman"],
    "storyline": "Batman raises the stakes in his war on crime.",
    "imdbScore": 9.0,
    "genres": ["Action", "Crime", "Drama"],
    "runtime": 152
  }

# Retrieve [GET]

+ Response 200

  [Movie17][]
