import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface InitDataInterface {
  title: string;
  uploaded_file: any;
}

const initData = {
  title: "",
  uploaded_file: null,
};

export default function FileUpload({ setGridData }: any) {
  const [payload, setPayload] = useState<InitDataInterface>(initData);

  const [loading, setLoading] = useState<Boolean>(false);

  const calculateHandler = async () => {
    const formData: any = new FormData();

    payload?.uploaded_file &&
      formData.append(
        "uploaded_file",
        payload?.uploaded_file,
        payload?.uploaded_file?.name
      );

    formData.append("title", payload?.title);

    try {
      setLoading(true);
      const res = await axios.post("/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const resAllFile = await axios.get("/allFile");
      setGridData(resAllFile?.data);
      toast.success(res?.data?.message || "", { toastId: 21412 });

      setPayload(initData);
      setLoading(false);
    } catch (err: any) {
      toast.warning(err?.response?.data?.error || err?.message, {
        toastId: 214121,
      });
      console.log("err", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-4">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
            Calculation Title
          </span>
          <input
            value={payload?.title}
            type="text"
            name="title"
            onChange={(e) => {
              setPayload((payload) => {
                return { ...payload, title: e.target.value };
              });
            }}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Ex: foo/Bar"
          />
        </label>
      </div>

      <div
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Text file only, File format Ex: 1+3124+12/2-10"
        className="flex relative"
      >
        <span className="group hover:border-green-500 w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-sm leading-6 text-gray-500 hover:text-green-500 font-medium py-3 cursor-pointer">
          <input
            id="uploaded_file"
            type="file"
            name="uploaded_file"
            onChange={(e: any) => {
              setPayload((payload) => {
                return { ...payload, uploaded_file: e.target.files[0] };
              });
            }}
            className="cursor-pointer absolute block opacity-0 w-full h-full z-50"
          ></input>
          <svg
            className="w-6 h-6 group-hover:text-green-500 text-gray-500 mb-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          {payload?.uploaded_file
            ? "File: " + payload?.uploaded_file?.name
            : "Drop your calculation text file here"}
        </span>
      </div>

      <div className="my-4">
        <button
          onClick={() => calculateHandler()}
          disabled={!payload?.title}
          className={` ${
            !payload?.title && "cursor-not-allowed"
          } w-full bg-green-200 text-green-900 rounded-lg text-center font-semibold p-2 hover:bg-green-300 flex justify-center items-center`}
        >
          <span>{loading ? "Calculating, Please wait..." : "Calculate"}</span>
          {loading && (
            <span>
              <svg
                className="animate-spin h-4 w-4 text-green-900 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
