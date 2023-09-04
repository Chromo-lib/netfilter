fetch('https://api.npoint.io/6beb7f1b0a9f0b10f6af')
  .then(r => r.json())
  .then(data => {
    const sectionReviews = document.querySelector('.reviews');
    data.forEach(d => {
      sectionReviews.innerHTML += `<div class="card">
      <h4>${d.name}</h4>
      <div class="mb-1"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
  <p>${d.review}</p>
</div>`
    })
  });