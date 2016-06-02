// jshint -W117

var rounds = [
  {
    query: "color of women's",
    right: "color of women's discharge",
    author: "Jamie"
  },
  {
    query: "why is my",
    right: "why is my poop green",
    author: "Lemon"
  },
  {
    query: "why is dona",
    right: "why is donald trump orange",
    author: "Lemon"
  },
  {
    query: "why does a",
    right: "why does alcohol make you poop",
    author: "Montrith"
  },
  {
    query: "is a",
    right: "is a hotdog a sandwich",
    author: "Montrith"
  },
  {
    query: "is an",
    right: "is anyone up",
    author: "Montrith"
  },
  {
    query: "why do we have to",
    right: "why do we have toenails",
    author: "Montrith"
  },
  {
    query: "does your f",
    right: "does your face hurt",
    author: "Montrith"
  },
  {
    query: "do you think an",
    right: "do you think animal farm will be a utopia",
    author: "Montrith"
  },
  {
    query: "why are b",
    right: "why are barns red",
    author: "Montrith"
  },
  {
    query: "who are a",
    right: "who are all the presidents",
    author: "Montrith"
  },
  {
    query: "can we h",
    right: "can we hear earthquakes",
    author: "Montrith"
  },
  {
    query: "is space",
    right: "is space real",
    author: "Montrith"
  },
  {
    query: "can your",
    right: "can your pet",
    author: "Montrith"
  },
  {
    query: "have we ever",
    right: "have we ever had a jewish president",
    author: "Montrith"
  },
  {
    query: "can you think",
    right: "can you think yourself sick",
    author: "Montrith"
  },
  {
    query: "how can i tell",
    right: "how can i tell if my iphone is unlocked",
    author: "Montrith"
  },
  {
    query: "blood from",
    right: "blood from a stone",
    author: "Montrith"
  },
  {
    query: "help poop",
    right: "help poop after surgery",
    author: "Montrith"
  },
  {
    query: "are your p",
    right: "are your parents home",
    author: "Montrith"
  },
  {
    query: "is body",
    right: "is bodybuilding a sport",
    author: "Montrith"
  },
  {
    query: "is my h",
    right: "is my house haunted",
    author: "Montrith"
  },
  {
    query: "is ge",
    right: "is germany in europe",
    author: "Montrith"
  },
  {
    query: "is mon",
    right: "is monica lewinsky married",
    author: "Montrith"
  },
  {
    query: "is war",
    right: "is war room on netflix",
    author: "Montrith"
  },
  {
    query: "where can i find g",
    right: "where can i find girl scout cookies",
    author: "Montrith"
  },
  {
    query: "how to make the",
    right: "how to make the color brown",
    author: "Montrith"
  },
  {
    query: "help my s",
    right: "help my shelf",
    author: "Montrith"
  },
  {
    query: "is the inter",
    right: "is the internet working",
    author: "Montrith"
  },
  {
    query: "how come",
    right: "how come we can't remember dreams",
    author: "Montrith"
  },
  {
    query: "are my r",
    right: "are my rotors bad",
    author: "Montrith"
  },
  {
    query: "can the g",
    right: "can the government own land",
    author: "Montrith"
  },
  {
    query: "are je",
    right: "are jews a race",
    author: "Montrith"
  },
  {
    query: "do va",
    right: "do vaccines cause autism",
    author: "Montrith"
  },
  {
    query: "was there e",
    right: "was there ever a female pope",
    author: "Montrith"
  },
  {
    query: "is pok",
    right: "is poker a sport",
    author: "Montrith"
  },
  {
    query: "can i po",
    right: "can i post to instagram from my mac",
    author: "Montrith"
  },
  {
    query: "can humans",
    right: "can humans get fleas",
    author: "Montrith"
  },
  {
    query: "can you ki",
    right: "can you kick the ball in volleyball",
    author: "Montrith"
  },
  {
    query: "why is the a",
    right: "why is the atmosphere important",
    author: "Montrith"
  },
  {
    query: "is a ch",
    right: "is a chicken a bird",
    author: "Montrith"
  },
  {
    query: "can you get a",
    right: "can you get aids from kissing",
    author: "Montrith"
  },
  {
    query: "is this f",
    right: "is this for real",
    author: "Montrith"
  },
  {
    query: "what's j",
    right: "is this for real",
    author: "Montrith"
  },
  {
    query: "can i d",
    right: "can i drake",
    author: "Montrith"
  },
  {
    query: "my dad w",
    right: "my dad works at nintendo",
    author: "Montrith"
  },
  {
    query: "are there any g",
    right: "are there any gay animals",
    author: "Montrith"
  },
  {
    query: "why should a d",
    right: "are there any gay animals",
    author: "Montrith"
  },
  {
    query: "are the ch",
    right: "are the chicago cubs playing today",
    author: "Montrith"
  },
  {
    query: "how can i f",
    right: "how can i find my iphone",
    author: "Montrith"
  },
  {
    query: "dangers of",
    right: "dangers of vaping",
    author: "Montrith"
  },
  {
    query: "best go",
    right: "best gore",
    author: "Montrith"
  },
  {
    query: "is there sp",
    right: "is there sperm in precum",
    author: "Montrith"
  },
  {
    query: "can i be a j",
    right: "can i be a jew",
    author: "Lemon"
  },
  {
    query: "is google",
    right: "is google making us stupid",
    author: "Montrith"
  }
];





// USE THIS URL....
// http://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=why%20do