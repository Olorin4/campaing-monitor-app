async function fetchSubscribers() {
    const res = await fetch('http://localhost:3000/subscribers');
    const subscribers = await res.json();
    const list = document.getElementById('subscriberList');
    list.innerHTML = '';
    subscribers.Results.forEach(sub => {
      const li = document.createElement('li');
      li.textContent = `${sub.Name} (${sub.EmailAddress})`;
      
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.onclick = () => removeSubscriber(sub.EmailAddress);
      li.appendChild(removeBtn);
  
      list.appendChild(li);
    });
  }
  
  async function addSubscriber(email, name) {
    await fetch('http://localhost:3000/subscribers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name })
    });
    fetchSubscribers();
  }
  
  async function removeSubscriber(email) {
    await fetch(`http://localhost:3000/subscribers/${encodeURIComponent(email)}`, {
      method: 'DELETE'
    });
    fetchSubscribers();
  }
  
  document.getElementById('subscriberForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    addSubscriber(email, name);
    e.target.reset();
  });
  
  fetchSubscribers();
  