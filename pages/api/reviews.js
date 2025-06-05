export default async function handler(req, res) {
    // Move to .env later
    const key = 'AIzaSyCJ8gj6kO2IgLYeSlhP7TyealHqnJTkAcE'
    const place = 'ChIJQ5LiPBQJZ0gRvrWofJn-OM8'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJQ5LiPBQJZ0gRvrWofJn-OM8&key=AIzaSyCJ8gj6kO2IgLYeSlhP7TyealHqnJTkAcE&fields=reviews`
    const response = await fetch(url);
    const data = await response.json();

    function getReviewHeader(text) {
        return text.split(' ').slice(0, 6).join(' ');
    }

    const filteredReviews = data.result.reviews
    .filter((review) => review.rating > 3) 
    .map((review) => ({
      ...review,  // Spread the review object
      text: review.text.slice(0, 500),
      header: getReviewHeader(review.text)
    }));

    res.status(200).json({ reviews:  filteredReviews });
  }