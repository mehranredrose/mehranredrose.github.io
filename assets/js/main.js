
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.animate([
                    { opacity:0, transform:'translateY(24px)' },
                    { opacity:1, transform:'translateY(0px)' }
                ],{
                    duration:700,
                    easing:'ease-out',
                    fill:'forwards'
                });
            }
        });
    });

    cards.forEach(card => observer.observe(card));
});
