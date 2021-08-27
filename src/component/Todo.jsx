import React, { useState, useEffect } from "react";
import todo from "../todo.png";

const getLSData = () => {
  let LSItems = localStorage.getItem("lists");
  if (LSItems) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

// tODO ADD LOCALSTORAGE
const Todo = () => {
  //data value
  const [data, setdata] = useState();
  //data array value
  const [items, setitems] = useState(getLSData());
  //icon toggle
  const [toggle, settoggle] = useState(true);
  //edit input selected value
  const [selectedItem, setselectedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  //add item and also after edit add item
  const addItem = () => {
    if (data === "") {
      alert("Please Enter Something");
    } else if (data && !toggle) {
      setitems(
        items.map((elem) => {
          if (elem.id === selectedItem) {
            return { ...elem, name: data };
          }
          return elem;
        })
      );
      settoggle(true);
      setdata("");
      setselectedItem(null);
    } else {
      const alldata = { id: new Date().getTime().toString(), name: data };
      setitems([...items, alldata]);
      setdata("");
      // setDataToLS(alldata);
    }
  };

  //delete perticular item
  const delItem = (id) => {
    const updatedArray = items.filter((elem) => {
      return id !== elem.id;
    });

    setitems(updatedArray);
  };
  //edit item
  const EditItem = (edit_id) => {
    let Edit_item = items.find((elem) => {
      return elem.id === edit_id;
    });

    settoggle(false);
    setdata(Edit_item.name);
    setselectedItem(edit_id);
  };

  //remove all
  const removeAllItems = () => {
    setitems([]);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="" />
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              value={data}
              onChange={(e) => setdata(e.target.value)}
            />
            {toggle ? (
              <i
                className="fa fa-plus"
                title="Add This Item"
                onClick={addItem}
              ></i>
            ) : (
              <i className="fas fa-edit add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((value) => {
              return (
                <div className="eachItem" key={value.id}>
                  <h1>{value.name}</h1>
                  <div className="todo-btn">
                    <i
                      className="fas fa-edit add-btn"
                      onClick={() => EditItem(value.id)}
                    ></i>
                    <i
                      className="fas fa-trash-alt add-btn"
                      onClick={() => delItem(value.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItems}
            >
              <span>Clear List</span>
            </button>
          </div>
        </div>
      <footer>
        Developed By <a className="portfolio_link" href="https://www.debojyotidey.in"> Debojyoti Dey</a>
      </footer>
      </div>

    </>
  );
};

export default Todo;
