import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {

    e.preventDefault()

    // validate input
    if (!itemName || quantity <= 0 || price <= 0 || isNaN(quantity) || isNaN(price) ) {
      alert("Please enter the valid item details")
      return;
    }

    const parsedPrice = Number(price)
    const parsedQuantity = Number(quantity)

    const totalCost = parsedPrice * parsedQuantity

    // create new item in form of object
    const newItem = { name: itemName, quantity: parsedQuantity, price: parsedPrice , totalCost }

    setItem( (prewItem) => [ ...prewItem, newItem])

    // reset from field
    setItemName("")
    setQuantity(0)
    setPrice(0)
  };

  const handleRemoveItem = (index) => {

    setItem( (prewItem) => prewItem.filter( (_, i) => i !== index) )

  }

  const totalInvoiceAmount = item.reduce( (sum, item) => sum + ( isNaN(item.totalCost) ? 0 : item.totalCost), 0)

  const handlePrintInvoice = () => {

    // Creating a printable invoice content

    let invoiceContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;"">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">Invoice Details</h1>

      </div>

      <div className="text-center items-center mx-10 ">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #000; padding: 8px;">Item Name</th>
                <th style="border: 1px solid #000; padding: 8px;">Quantity</th>
                <th style="border: 1px solid #000; padding: 8px;">Price per Unit</th>
                <th style="border: 1px solid #000; padding: 8px;">Total cost</th>
              </tr>
          </thead>
          <tbody>
      


    `

    //Adding the items details in the invoiceContent
    item.forEach( (item) => {
      invoiceContent += `
        <tr className="bg-gray-100">
        <th style="border: 1px solid #000; padding: 8px;">${item.name}</th>
          <th style="border: 1px solid #000; padding: 8px;">${item.quantity}</th>
          <th style="border: 1px solid #000; padding: 8px;">${item.price}</th>
          <th style="border: 1px solid #000; padding: 8px;">${item.totalCost}</th>
        </tr>

      `
    })


    // Adding the total invoice amount
    invoiceContent += `
          </tbody>
        </table>
        <h3 style="text-align: right; font-size: 20px; margin-top: 20px;">Total Invoice Amount: &#8377;${totalInvoiceAmount}</h3>
      </div>

    `

    // Open the new window with the invoice content
    const printWindow = window.open("", "", "width = 700, height = 900")
    printWindow.document.write(invoiceContent)
    printWindow.document.close()


    // trigger the print 
    printWindow.print()

    // Close the print window
    printWindow.close()


  }

  return (
    <div className="bg-slate-700 w-full min-h-screen pb-8">
      <div className="w-full bg-slate-600 h-auto p-4 flex items-center justify-center">
        <h1 className="text-4xl text-white bg-slate-700 rounded-3xl font-bold tracking-widest p-10 shadow-2xl">
          INVOICE
        </h1>
      </div>

      <div className="flex items-center justify-center w-full ">
      <form
        action=""
        onSubmit={handleSubmit}
        className=""
      >
            <div className="flex items-start flex-col  gap-4  my-4 sm:mx-0 md:w-[500px] w-[300px] ">
              <label className="text-white text-md tracking-widest">Item Name :</label>

              <input
                type="text"
                id="itamName"
                value={itemName}
                required
                onChange={ (e) => setItemName( e.target.value) }
                className="text-lg w-full  rounded-lg outline-none border-gray-800 p-2"
              />
            </div>

            <div className="flex items-start flex-col  gap-4 my-4 sm:mx-0 ">
              <label className="text-white text-md tracking-widest">Quantity :</label>

              <input
                type="number"
                min={0}
                id="quantity"
                value={quantity}
                required
                onChange={ (e) => setQuantity(e.target.value) }
                className="text-lg w-full rounded-lg outline-none border-gray-800 p-2"
              />
            </div>

            <div className="flex items-start flex-col  gap-4 my-4 sm:mx-0 ">
              <label className="text-white text-md tracking-widest">Price :</label>

              <input
                type="number"
                min={0}
                id="price"
                value={price}
                required
                onChange={ (e) => setPrice(e.target.value) }
                className="text-lg w-full rounded-lg outline-none border-gray-800 p-2"
              />
            </div>

            <button 
              type="submit" 
              className="bg-blue-500 text-white text-xl w-full tracking-widest px-4 p-2 rounded-lg font-bold hover:bg-blue-600">
                Add Item
            </button>

            

          </form>

      </div>

      <div className="text-center items-center mx-10 ">
        <h2 className="text-3xl text-white font-bold tracking-widest p-8 mb-4 ">Invoice Details</h2>

        {
          item.length > 0 ?
          (
            <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 text-sm px-2 py-1">Item Name</th>
                  <th className="border border-gray-300 text-sm px-2 py-1">Quantity</th>
                  <th className="border border-gray-300 text-sm px-2 py-1">Price per Unit</th>
                  <th className="border border-gray-300 text-sm px-2 py-1">Total cost</th>
                  <th className="border border-gray-300 text-sm px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  item.map( (item, index) => (
                    <tr key={index}>

                      <td className="border border-gray-300 text-white px-4 py-2">{ item.name }</td>
                      <td className="border border-gray-300 text-white px-4 py-2">{ item.quantity }</td>
                      <td className="border border-gray-300 text-white px-4 py-2">{ typeof item.price == "number" ? item.price.toFixed(2) : "N/A" }</td>
                      <td className="border border-gray-300 text-white px-4 py-2">{ typeof item.totalCost == "number" ? item.totalCost.toFixed(2) : "N/A" }</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                          X
                        </button>
                      </td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <p className='text-md mb-4 text-white '>No items added yet</p>
          )
        }

        <h3 className="text-lg font-bold text-white">Total Invoice Amount: &#8377;{totalInvoiceAmount.toFixed(2)}</h3>

      </div>

      
      {
        item.length > 0 ? (
          <button 
            className="bg-purple-500 text-white text-xl tracking-widest mx-4 px-4 p-2 rounded-lg font-bold hover:bg-purple-600 mt-4"
            onClick={handlePrintInvoice}
            // disabled = {item.lenght === 0}
          >
            Print Invoice
          </button>
        ) : " "
      }

      
    </div>
  );
}

export default App;
