const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const fetchData = () => {
    axios.get('http://localhost:8000/api/customers/', {
      params: { query: searchQuery, start_date: startDate, end_date: endDate, sort_by: sortBy, order }
    })
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, startDate, endDate, sortBy, order]);

  return (
    <div>
      <h1>Customer List</h1>
      <div>
        <input type="text" placeholder="Search by Name" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>Toggle Order</button>
      </div>
      <table>
        {/* Table same as above */}
      </table>
    </div>
  );
};
