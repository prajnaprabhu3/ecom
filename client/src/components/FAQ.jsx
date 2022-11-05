import '../styles/FAQ.scss'
import { Collapse } from 'antd';
import React from 'react';
const { Panel } = Collapse;


const text1 = `
entore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
`;

const text2 = `
entore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
`;

const text3 = `
entore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
`;

const text4 = `
entore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
`;

const FAQ = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div id="faq" className='flex flex-col m-10 mt-20 p-5 justify-between faqWrapper'>
    <p className='text-4xl font-bold'>FAQ'<span className='purple'>s</span></p>
    
    <div className='mt-4 py-4'>
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="How long will it take for a product to sell?" key="1">
        <p>{text1}</p>
      </Panel>
      <Panel header="Any information regarding discount rates?" key="2">
        <p>{text2}</p>
      </Panel>
      <Panel header="Any information regarding discount rates?" key="3">
        <p>{text3}</p>
      </Panel>
      <Panel header="Any information regarding discount rates?" key="3">
        <p>{text3}</p>
      </Panel>
    </Collapse>
    </div>
   </div>
  );
};
export default FAQ;