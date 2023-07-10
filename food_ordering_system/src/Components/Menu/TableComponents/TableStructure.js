import React, {useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from './Table';
import { setPopUps } from '../../../Slices/popUpForms';

function TableStructure() {
    const {allOrderDetails} = useSelector((state) => state.menus);
    const dispatch = useDispatch();

    const columns = useMemo(() => [
      {
        Header: "Order Date",
        accessor: "order_date",
      },
      {
        Header: "Token Number",
        accessor: "token_number",
      },
      {
        Header: "Category Name",
        accessor: "category_name",
      },
      {
        Header: "Item Name",
        accessor: "item_name",
      },
      {
        Header: "Prize",
        accessor: "prize",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
    ], []);

    const data = useMemo(() => allOrderDetails, [allOrderDetails]);

    const clearItemFrom = () => {
        dispatch(setPopUps({isPopup: false, popedForm: ""}));
    };

    return (
        <div id="staticModal" className="fixed inset-0 flex items-center justify-center" style={{zIndex: 100}}>
          <div className="bg-white menu-card-box rounded-lg shadow-lg mx-auto" style={{ maxHeight: '100vh', marginTop: "3%" }}>
            <div className="p-1 rounded-t">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900 text-dark">Order Details</h3>
                <button
                  onClick={clearItemFrom}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="staticModal"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <div className="p-1 tableScroll" style={{ maxHeight: 'calc(90vh - 60px)' }}>
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
    );
}

export default TableStructure;