import "./Scrf.scss";
import { moneySplitter } from "../../util/validators";
import { Upload, Modal, Button, Row, Table } from "antd";
import { useEffect, useState } from "react";
import tire from "../../assets/images/tire.png";
import excelFile from "../../assets/files/Book.xlsx";
import { useHistory } from "react-router-dom";

export default function Scrf() {
  const { Dragger } = Upload;
  const [openModal, setOpenModal] = useState(false);
  const status = [
    { value: "", name: "همه وضعیت‌ها" },
    { value: 0, name: "غیرفعال" },
    { value: 1, name: "فعال" },
  ];
  const [sellers, setSellers] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [search, setSearch] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [fileList, setFileList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let params = new URLSearchParams(history.location.search);
    setCategoryId(params.get("category_id"));
    setCityId(params.get("city_id"));
    setSearch(params.get("search") ? params.get("search") : "لاستیک");
    //I always use Axios for fetch data ! that's very better :)
    fetch("localhost:8000/api/brands/")
      .then((res) => {
        //in this part should set data ! and response for this fetch is here !
      })
      .catch((err) => {
        // beacuse servise error , i set data in here .
        setBrands([
          { id: "", name: "همه برندها" }, //i add it
          { id: 0, name: "برند صفر" },
          { id: 1, name: "برند یک" },
          { id: 2, name: "برند دو" },
        ]);
      });

    //get sellers
    fetch("localhost:8000/api/sellers/")
      .then((res) => {})
      .catch((err) => {
        setSellers([
          { id: "", name: "همه فروشنده ها" }, //i add it
          { id: 0, name: "فروشنده صفر" },
          { id: 1, name: "فروشنده یک" },
          { id: 2, name: "فروشنده دو" },
        ]);
      });

    //get Cities
    fetch("localhost:8000/api/cities/")
      .then((res) => {})
      .catch((err) => {
        setCities([
          { id: "", name: "همه شهر ها" }, //i add it
          { id: 0, name: "شهر صفر" },
          { id: 1, name: "شهر یک" },
          { id: 2, name: "شهر دو" },
        ]);
      });
    //get categories
    fetch("localhost:8000/api/categories/")
      .then((res) => {})
      .catch((err) => {
        setCategories([
          { id: "", name: "همه دسته ها" }, //i add it
          { id: 0, name: "دسته صفر" },
          { id: 1, name: "دسته یک" },
          { id: 2, name: "دسته دو" },
        ]);
      });
  }, []);

  const submitHandler = (e) => {
    e.target.reset();
    e.preventDefault();
    let queryString;
    queryString =
      "/?" +
      (categoryId ? `category_id=${categoryId}&` : "") +
      (cityId ? `city_id=${cityId}&` : "") +
      "limit=10&page=1" +
      (search ? `&search=${search}` : "");
    // params in quary string are according to the photo
    history.push(`${queryString}`);
  };

  const columns = [
    {
      title: "تصویر",
      label: "تصویر",
      dataIndex: "img",
      key: "img",
      render: (val) => <img className="image" src={val} alt="tire" />,
    },
    {
      title: "کد",
      label: "کد",
      dataIndex: "id",
      key: "id",
      onCell: (record, rowIndex) => ({
        style: {
          color: "blue",
        },
      }),
    },
    {
      title: "شهر",
      label: "شهر",
      dataIndex: "city",
      key: "city",
      render: (val) => <span>{val.name}</span>,
    },
    {
      title: "فروشنده",
      label: "فروشنده",
      dataIndex: "seller",
      key: "seller",
      render: (val) => <span>{val.name}</span>,
    },
    {
      title: "وضعیت",
      dataIndex: "is_buyable",
      key: "is_buyable",
      label: "وضعیت",
      render: (val) =>
        val ? (
          <span className="buyable">قابل خرید</span>
        ) : (
          <span className="disbuyable">غیرقابل خرید</span>
        ),
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      label: "نام",
    },
    {
      title: "تخفیف",
      dataIndex: "discount_amount",
      label: "تخفیف",
      key: "discount_amount",
      render: (val) =>
        val ? (
          <span>{moneySplitter(val)} تومان</span>
        ) : (
          <span className="notdiscount">ندارد</span>
        ),
    },
    {
      title: "قابل پرداخت",
      dataIndex: "payble",
      label: "قابل پرداخت",
      key: "payble",
      render: (val) => <span>{moneySplitter(val)} تومان</span>,
    },
  ];

  const data = [
    {
      id: 0,
      name: "کالای صفر",
      product_id: 0,
      img: tire, //i add this image
      is_active: true,
      is_buyable: true,
      seller: { id: 0, name: "فروشنده صفر" },
      city: { id: 0, name: "شهر صفر" },
      category: { id: 0, name: "دسته صفر" },
      brand: { id: 0, name: "برند صفر" },
      discount_percentage: 10,
      discount_amount: 100000,
      payble: 1200000,
    },
    {
      id: 1,
      name: "کالای یک",
      img: tire, //i add this image
      product_id: 1,
      is_active: true,
      is_buyable: false,
      seller: { id: 1, name: "فروشنده یک" },
      city: { id: 1, name: "شهر یک" },
      category: { id: 1, name: "دسته یک" },
      brand: { id: 1, name: "برند یک" },
      discount_percentage: 20,
      discount_amount: 200000,
      payble: 2300000,
    },
    {
      id: 2,
      name: "کالای دو",
      img: tire, //i add this image
      product_id: 2,
      is_active: false,
      is_buyable: false,
      seller: { id: 2, name: "فروشنده دو" },
      city: { id: 2, name: "شهر دو" },
      category: { id: 2, name: "دسته دو" },
      brand: { id: 2, name: "برند دو" },
      discount_percentage: null,
      discount_amount: null,
      payble: 1200000,
    },
  ];
  const props = {
    name: "file",
    fileList: fileList,
    multiple: true,
    action: "//jsonplaceholder.typicode.com/posts/",
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      setFile(info.file);
      setFileList(info.fileList.length > 0 ? [info.fileList[0]] : []);
      setFileName(info.file.name);
      if (status === "done") {
        setOpenModal(true);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const downloadExcelFile = () => {
    fetch("localhost:8000/api/sites/{site_id}/products/excel/", {
      name: "کالای صفر",
      category_id: 0,
      brand_id: 0,
      is_active: 0,
      seller_id: 0,
      city_id: 0,
    })
      .then((res) => {})
      .catch((err) => {
        console.log("error");

        var file_path = excelFile;
        // window.open(file_path, "Download");
        var a = document.createElement("A");
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    const options = {
      method: "POST",
      body: formData,
    };

    fetch("api-for-uploadfile", options)
      .then(() => {
        setOpenModal(false);
      })
      .catch(() => {
        setOpenModal(false);
      });
  };

  return (
    <div className="container">
      <Dragger {...props}>
        <p className="ant-upload-text">
          آپلود اکسل کالاهای فروشگاه snappcarfix
        </p>
        <p className="ant-upload-hint">نوع فایل باید xls یا xlsx باشد</p>
      </Dragger>
      <form onSubmit={submitHandler}>
        <input
          className="input1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select>
          {sellers.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select>
          {brands.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select>
          {status.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select value={cityId} onChange={(e) => setCityId(e.target.value)}>
          {cities.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <button type="submit" className="filterbtn">
          فیلتر
        </button>
        <button className="excelBtn" onClick={downloadExcelFile}>
          دانلود اکسل
        </button>
      </form>
      <Table columns={columns} dataSource={data} />
      <Modal
        visible={openModal}
        footer={null}
        closable={false}
        centered
        width={600}
      >
        <p className="modalText">
          {" "}
          آیا آپلود فایل <span className="blueText">{fileName}</span> را برای
          کالاهای فروشگاه snappcarfix تایید میکنید ؟
        </p>
        <p className="modalseconderyText">
          با آپلود این فایل مشخصات کالاهای فروشگاه تغییر می کند
        </p>
        <Row justify="space-between">
          <Button
            className="buttonsModal"
            type="danger"
            onClick={() => {
              setOpenModal(false);
              setFileList([]);
            }}
          >
            خیر
          </Button>
          <Button onClick={uploadFile} className="buttonsModal" type="primary">
            بله
          </Button>
        </Row>
      </Modal>
    </div>
  );
}
