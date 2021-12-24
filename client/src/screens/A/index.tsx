import React, { Fragment, useEffect, useState } from "react";
import ResultCard from "./components/resultCard";
import axios from "axios";
import FileUpload from "./components/fileUpload";
import CustomModal from "../_common/modal";

export default function ScreenA() {
  const [gridData, setGridData] = useState<any>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/allFile");
        console.log("e", res?.data);
        setGridData(res?.data);
      } catch (err) {
        console.log("Err", err);
      }
    })();
  }, []);

  return (
    <div className="h-screen w-100 p-4 text-gray-900">
      <div className="flex justify-center">
        <div className="w-full md:w-2/4">
          <h1 className="text-2xl">Total Result: {gridData?.length}</h1>

          {gridData?.map((item: any, index: any) => (
            <Fragment key={index}>
              <ResultCard
                item={item}
                setModalData={setModalData}
                setShowModal={setShowModal}
              />
            </Fragment>
          ))}

          {gridData?.length > 0 && (
            <div className="flex justify-center my-4">
              <button className="bg-green-200 text-green-900 rounded-lg text-center text-xs font-semibold px-4 p-1 hover:bg-green-300">
                See all
              </button>
            </div>
          )}

          <FileUpload setGridData={setGridData} />

          {/* Modal */}
          <CustomModal
            modalData={modalData}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </div>
  );
}
