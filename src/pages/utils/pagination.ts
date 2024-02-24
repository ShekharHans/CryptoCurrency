// pagination.ts

const paginate = (pageNumber: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>): void => {
    setCurrentPage(pageNumber);
  };
  
  export default paginate;
  