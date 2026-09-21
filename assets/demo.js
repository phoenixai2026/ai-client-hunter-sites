'use strict';
const select = document.querySelector('#job-type');
const heading = document.querySelector('#job-heading');
const guide = document.querySelector('#job-guide');
function updateJob() {
  const option = select.selectedOptions[0];
  heading.textContent = option.value ? `Discuss ${option.textContent.toLowerCase()}` : 'A useful first conversation';
  guide.textContent = option.dataset.guide || 'Have your suburb, a short description of the issue and your preferred timing ready. Ask about availability and the next steps.';
}
if (select && heading && guide) {
  select.addEventListener('change', updateJob);
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => { select.value = link.dataset.service; updateJob(); });
  });
}
