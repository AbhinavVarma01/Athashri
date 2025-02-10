function validateForm(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    
    if (userId.trim() === '' || password.trim() === '') {
        showMessage('Please fill in all fields', 'error');
        return false;
    }
    
    // Here you would typically make an API call to validate credentials
    showMessage('Welcome back!', 'success');
    
    // Add loading state to button
    const button = event.target.querySelector('button');
    button.innerHTML = '<span class="loading">Signing in...</span>';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = 'Sign In';
        button.disabled = false;
    }, 2000);
    
    return false;
}

function showMessage(message, type) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.padding = '15px 25px';
    alert.style.borderRadius = '12px';
    alert.style.backgroundColor = type === 'error' ? '#fff3f3' : '#f0fff4';
    alert.style.color = type === 'error' ? '#dc3545' : '#28a745';
    alert.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    alert.style.zIndex = '1000';
    alert.style.border = `1px solid ${type === 'error' ? '#ffcdd2' : '#c3e6cb'}`;
    alert.style.fontSize = '1rem';
    alert.style.fontWeight = '500';
    
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateX(-50%) translateY(-20px)';
        alert.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}