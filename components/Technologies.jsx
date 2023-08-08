import React from 'react';

const Technologies = () => {
  return (
    <div className="text-center flex justify-center py-8 text-xl">
      <ul className="flex gap-8 text-gray-400">
        <li>Powered By:</li>
        <li className="flex items-center">
          <img src="base.webp" alt="" className="w-[27px]" />
          &nbsp;
          <p>Base</p>
        </li>
        <li className="flex items-center">
          <img src="zora.png" alt="" className="w-[27px]" />
          &nbsp;
          <p>Zora</p>
        </li>
        <li className="flex items-center">
          <img src="covalent.jpg" alt="" className="w-[27px]" />
          &nbsp;
          <p>Covalent</p>
        </li>
      </ul>
    </div>
  );
};

export default Technologies;
