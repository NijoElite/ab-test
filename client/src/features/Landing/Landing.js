import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { cn } from '@bem-react/classname';

import './Landing.css';

const cnLanding = cn('Landing');

const Skeletons = React.memo(({ count = 1 }) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <Table.Row key={i}>
        <Table.Cell>
          <div className={cnLanding('Placeholder')}>&nbsp;</div>
        </Table.Cell>
        <Table.Cell>
          <div className={cnLanding('Placeholder')}>&nbsp;</div>
        </Table.Cell>
      </Table.Row>
    );
  }

  return rows;
});
Skeletons.displayName = 'Skeleton';

const Paranja = React.memo(() => <div className={cnLanding('Paranja')}/>);
Paranja.displayName = 'Paranja';

const Landing = () => {
  const [values, setValues] = useState({ first: [], second: [] });
  const [isLoading, setLoading] = useState(false);

  const updateValues = useCallback(async () => {
    setLoading(true);

    const response = await axios.get('/api/data');
    setValues(response.data);

    setTimeout(() => {
      setLoading(false);
    }, 300); // Задержка в 300мс, чтобы мигание скелетонов не резало глаза
  }, []);

  const onRecalculateClick = useCallback(() => {
    updateValues();
  }, [updateValues]);

  useEffect(() => {
    updateValues();
  }, [updateValues]);

  const { first, second } = values;
  const rowsCount = Math.max(first.length, second.length);

  let rows = [];
  if (!isLoading) {
    for (let i = 0; i < rowsCount; i++) {
      const firstVal = first[i] ?? null;
      const secondVal = second[i] ?? null;

      rows.push(
        <Table.Row key={i}>
          <Table.Cell>{firstVal}</Table.Cell>
          <Table.Cell>{secondVal}</Table.Cell>
        </Table.Row>
      );
    }
  } else {
    rows = <Skeletons count={10}/>;
  }

  return (
    <div className={cnLanding()}>
      <div className={cnLanding('Wrapper')}>

        <Table className={cnLanding('Table')}>
          {isLoading && <Paranja/>}
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Column 1</Table.HeadCell>
              <Table.HeadCell>Column 2</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
        <div className={cnLanding('Footer')}>
          <Button className={cnLanding('Recalculate')} disabled={isLoading} onClick={onRecalculateClick}>Recalculate</Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
