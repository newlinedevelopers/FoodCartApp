import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import companyIcon from '../../Image/company-icon.png';
import { useSelector } from 'react-redux';
//import { setColor, setStyle } from '../../Slices/companyStyle';

const companyTitle = [
  {
    letter: 'D'
  },
  {
    letter: 'C'
  },
  {
    letter: 'A'
  },
  {
    letter: 'R'
  },
  {
    letter: 'T'
  }
];

function CompanyTitle(args) {
  const color = useSelector((state) => state.companyStyle.color);
  const headerStyle = useSelector((state) => state.companyStyle.header_style);
  //const dispatch = useDispatch();
  const params = useMemo(() => "self-center text-5xl font-semibold whitespace-nowrap dark:text-" + color, [color]);
  const style = useMemo(() => headerStyle, [headerStyle]);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleOnClick} className="flex flex-shrink-0 align-items-center cursor-pointer" style={style}>
      <span className={params}>F</span>
      <img className="block h-8 w-auto lg:hidden" alt="Your Company" style={{ height: "45px", width: "45px", marginTop: "5px" }} src={companyIcon} />
      <img className="hidden h-8 w-auto lg:block" src={companyIcon} style={{ height: "90px" }} alt="Your Company" />
      {companyTitle.map((value) => (
        <span key={value.letter} className={params}>{value.letter}</span>
      ))}
    </div>
  );
}

export default CompanyTitle;
