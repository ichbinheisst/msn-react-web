import React from "react";
import avatar from "../../../../assets/greenAvatar.png";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchContact } from "../../../../redux/reducers/searchNewContact";
import ModalResult from "./modalResult";
import { closeResultModal } from "../../../../redux/reducers/searchNewContact";

const SearchBar = ({ sendContactRequest }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.searchNewContact);
  const Mydata = useSelector((state) => state.login.user.data);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput.trim()) {
      dispatch(searchContact(searchInput));
    }
  };

  function closeModal() {
    dispatch(closeResultModal());
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="search a new contact"
            className={styles.searchInput}
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
          />
          <button className={styles.searchButton}>
            <AiOutlineSearch size={"20px"} />
          </button>
        </form>

        <button className={styles.addUserButton} onClick={handleSearch}>
          <img
            src={avatar}
            alt="add user"
            className={styles.icon}
          />
        </button>
      </div>

      {contact.modal && (
        <div className={styles.modalcontainer}>
          <ModalResult
            state={contact.modal}
            user={contact.data}
            close={closeModal}
            sendContactRequest={sendContactRequest}
            Mydata={Mydata}
          />
        </div>
      )}
    </>
  );
};
export default SearchBar;
