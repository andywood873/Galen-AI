import React from 'react';

const Technologies = () => {
  return (
    <div className="text-center flex justify-center py-8 text-lg">
      <ul className="flex gap-3 text-gray-400">
        <li>Powered By:</li>
        <li className="flex items-center">
          <img
            src="https://img.freepik.com/free-photo/golden-yellow-seamless-venetian-plaster-background_24972-294.jpg?w=2000"
            alt=""
            className="w-[27px] h-[27px] rounded-full"
          />
          &nbsp;
          <p className="text-md">Mode Network</p>
        </li>
        {/* <li className="flex items-center">
          <img src="zora.png" alt="" className="w-[27px]" />
          &nbsp;
          <p>Zora</p>
        </li>
        <li className="flex items-center">
          <img src="covalent.jpg" alt="" className="w-[27px]" />
          &nbsp;
          <p>Covalent</p>
        </li> */}
      </ul>
    </div>
  );
};

export default Technologies;
