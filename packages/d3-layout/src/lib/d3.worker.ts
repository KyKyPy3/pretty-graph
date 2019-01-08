import { Layout } from './layout';

const ctx: Worker = self as any;

let layout: Layout | null = null;

ctx.addEventListener('message', (event) => {
  const data = event.data;

  switch(data.name) {
    case 'init':
      layout = new Layout();
      layout.onEvent.on('tick', (percent) => {
        ctx.postMessage({type: "tick", progress: percent});
      });
      layout.onEvent.on('end', (d) => {
        ctx.postMessage({type: 'end', d});
      });
      layout.init(data);
      break;
    case 'calculate':
      if (layout) {
        layout.calculate();
      }
      break;
    case 'destroy':
      if (layout) {
        layout.onEvent.removeAllListeners();
        layout.destroy();
      }
      layout = null;
      break;
  }
});

export default null as any;
