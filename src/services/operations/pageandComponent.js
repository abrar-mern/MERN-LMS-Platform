import React from "react";
import {toast} from "react-hot-toast";
import {apiConnector} from "../apiconnector";
import {catalogData} from "../apis"

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading..");
    let result = [];
    try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId:categoryId});
        if (!response?.data?.success) {
            toast.error(response?.data?.message || "Could not fetch data");
                return result;
        }
        result = response?.data;
    }
    catch(err){
        console.log('Catalog Page Data API Error', err);
        toast.error("Could not fetch data");
    }
    toast.dismiss(toastId);
    return result;
}
