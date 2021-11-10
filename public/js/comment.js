async function commentFormHandler(event) {
    event.preventDefault();
    alert('text')
    const entry = document.querySelector('.entry').value.trim();
  
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    if (entry) {
       const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                entry
            }),
            headers: {
                'Content-Type': 'application/json'
            }
       });

        if(response.ok) {
           document.location.reload();
        } else {
            alert('Could not add a comment');
        }
    }
}
  
document.querySelector('.comment').addEventListener('submit', commentFormHandler);