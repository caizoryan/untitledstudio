const $$ = e =>  document.querySelectorAll(e)

const fade_in = (selector, r = 300, offset = 10) => {
  $$(selector).forEach((e) => {
    e.style.transition = `none`
    e.style.opacity = 0;
    e.style.transform = "translateY(100px)";
    (e.style.transition = `all ${r}ms`)
    setTimeout(
      () => ((e.style.opacity = 1), (e.style.transform = "translateY(0px)")),
      offset,
    );
  });
};

const fade_out = (selector, r = 300, offset = 10, transform = 'translateY') => {
  $$(selector).forEach((e) => {
    setTimeout(() => {
			e.style.transition = `none`
			e.style.opacity = 1;
			e.style.transform = transform + "(0px)"

			e.style.transition = `all ${r}ms`
			e.style.opacity = 0;
			e.style.transform = transform + "(100px)"
		}, offset);
  });
};

const fade_out_random_stagger = (selector, r = 300, offset = 10, global_offset=10) => {
  $$(selector).forEach((e,i,p) => {
		let t = global_offset + (offset * (Math.floor(Math.random() * p.length)+1))
    e.style.transition = `none`
    e.style.opacity = 1;
		e.style.transform = "translateY(0px)"
    setTimeout(() => {
			e.style.transition = `all ${r}ms`
			e.style.opacity = 0;
			e.style.transform = "translateY(100px)"
		}, t);
  });
};

const fade_out_stagger = (selector, r = 300, offset = 10, global_offset=10) => {
  $$(selector).forEach((e,i) => {
		let t = global_offset + (offset * (i+1))
    e.style.transition = `none`
    e.style.opacity = 1;
		e.style.transform = "translateY(0px)"
    setTimeout(() => {
			e.style.transition = `all ${r}ms`
			e.style.opacity = 0;
			e.style.transform = "translateY(100px)"
		}, t);
  });
};

const fade_in_stagger = (selector, r = 300, offset = 10, global_offset = 10) => {
  $$(selector).forEach((e, i) => {
		let t =  (offset * (i+1))
    e.style.transition = `all 0ms`
    e.style.opacity = 0;
    e.style.transform = "translateY(100px)";
    setTimeout(() => {
			console.log('running')
			e.style.transition = `all ${r}ms`
			e.style.opacity = 1;
			e.style.transform = "translateY(0px)"
			setTimeout(() => {e.style = ''}, r)
		}, global_offset + t);
  });
};

export const fade_in_any_stagger = (selector, r = 300, offset = 10, global_offset = 10) => {
  $$(selector).forEach((e, i) => {
		let t =  (offset * (i+1))
    e.style.transition = `all 0ms`
    e.style.opacity = 0;
    e.style.transform = `translate${Math.random() > .5 ? "Y" : "Y"}(${Math.random() > .5 ? 50 : -50}px)`;

    e.style.transform = ` translateY(50px) `;
    setTimeout(() => {
			console.log('running')
			e.style.transition = `all ${r}ms`
			e.style.opacity = 1;
			e.style.transform = "translateY(0px) translateX(0px)"
		}, global_offset + t);
  });
};

const sweep_out = (selector, r = 300, offset = 10, cb = () => null) => {
  $$(selector).forEach((e) => {
    e.style.transition = `all 0ms`
    e.style.transition = `all ${r}ms`
    setTimeout(
      () => {e.style.height = '0vh' ; cb()},
      offset,
    );
  });
}

const sweep_down = (selector, r = 300, offset = 10, cb = () => null) => {
  $$(selector).forEach((e) => {
    e.style.transform = "translateY(0px)";
		e.style.transition = `all 0ms`
    setTimeout(
      () => {
				e.style.transition = `all ${r}ms`
				e.style.transform = "translateY(200px)";
			},
      offset,
    );
  });
}

export { fade_out_random_stagger,fade_out_stagger,fade_out,fade_in, fade_in_stagger, sweep_out, sweep_down };
