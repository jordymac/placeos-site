document.querySelectorAll('form[action^="https://submit-form.com"]').forEach(form => {
  // Skip forms that have iframe targets (handled by our custom script)
  if (form.target && form.target.includes('Frame')) {
    console.log('Skipping Botpoison for iframe form:', form.id);
    return;
  }
  
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const botpoison = new Botpoison({
      publicKey: 'pk_c7d39b30-2471-4ff9-8f3c-ac7d67a1239b',
    });

    try {
      const result = await botpoison.challenge();

      const formData = new FormData(form);
      formData.append('_botpoison', result.solution);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      const parent = form.parentElement;

      if (response.ok) {
        form.style.display = 'none';
        parent.querySelector('.w-form-done').style.display = 'block';
      } else {
        parent.querySelector('.w-form-fail').style.display = 'block';
      }
    } catch (error) {
      const parent = form.parentElement;
      parent.querySelector('.w-form-fail').style.display = 'block';
    }
  });
});