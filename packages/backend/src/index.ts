import httpServer from './server';
import Machines from './machine';

const PORT = 3000;
Machines.prepare()()
  .then(async (machines) => {
    console.log('foo');
    switch (machines._tag) {
      case 'Left':
        console.error(machines.left);
        throw machines.left;
      case 'Right':
        httpServer.listen(PORT, () => {
          console.log(`Server is listening on port ${PORT}`);
        });
    }
  })
  .catch((e) => {
    console.error(e);
    return e;
  });
