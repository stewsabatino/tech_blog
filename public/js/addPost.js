async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const entry = document.querySelector('#entry').value;
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        entry
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);