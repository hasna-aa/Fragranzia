import React, { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import UserService from "../../services/user-api-service/UserService";
import "./dashboard.css";



const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 17000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 22000 },
  { month: "May", sales: 26000 },
  { month: "Jun", sales: 31000 },
];



const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#E91E63",
  "#00BCD4",
];



const Dashboard = () => {


  const userService = UserService();



  const [stats,setStats] = useState({

    products:0,
    users:0,
    orders:0,
    revenue:0,

  });



  const [pieData,setPieData] = useState([]);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    loadDashboard();

  },[]);





const loadDashboard = async () => {
  try {
    // Dashboard Stats
    const dashboard = await userService.getDashboardStats();

    setStats({
      products: dashboard.products || 0,
      users: dashboard.users || 0,
      orders: dashboard.orders || 0,
      revenue: dashboard.revenue || 0,
    });

    // Products
    const response = await userService.getProducts();

    // API array ആണോ object ആണോ രണ്ടും handle ചെയ്യും
    const products = Array.isArray(response)
      ? response
      : response.products || [];

    const categoryMap = {};

    products.forEach((item) => {
      const category =
        typeof item.category === "object"
          ? item.category?.name || "Others"
          : item.category || "Others";

      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const categoryData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    setPieData(categoryData);
  } catch (error) {
    console.error("Dashboard Error:", error);
  } finally {
    setLoading(false);
  }
};



  if(loading){


    return (

      <div className="dashboard-container">

        <h2>
          Loading Dashboard...
        </h2>

      </div>

    );


  }







  return (

    <div className="dashboard-container">



      <h1 className="dashboard-heading">

        Dashboard

      </h1>





      {/* CARDS */}


      <div className="dashboard-cards">





        <div className="dashboard-card">


          <div>

            <h4>
              Products
            </h4>


            <h2>
              {stats.products}
            </h2>


            <p>
              Total Products
            </p>

          </div>


          <div className="icon green">

            <FaBoxOpen/>

          </div>


        </div>








        <div className="dashboard-card">


          <div>

            <h4>
              Orders
            </h4>


            <h2>
              {stats.orders}
            </h2>


            <p>
              Total Orders
            </p>


          </div>



          <div className="icon orange">


            <FaShoppingCart/>


          </div>



        </div>









        <div className="dashboard-card">


          <div>


            <h4>
              Users
            </h4>


            <h2>
              {stats.users}
            </h2>


            <p>
              Registered Users
            </p>


          </div>



          <div className="icon blue">


            <FaUsers/>


          </div>



        </div>









        <div className="dashboard-card">


          <div>


            <h4>
              Revenue
            </h4>


            <h2>

              ₹{stats.revenue}

            </h2>


            <p>
              Total Revenue
            </p>


          </div>




          <div className="icon purple">


            <FaRupeeSign/>


          </div>




        </div>




      </div>









      {/* CHARTS */}



      <div className="dashboard-bottom">





        {/* SALES CHART */}



        <div className="chart-card">


          <h2>
            Sales Overview
          </h2>




          <ResponsiveContainer
            width="100%"
            height={320}
          >



            <LineChart data={salesData}>


              <XAxis dataKey="month"/>


              <YAxis/>


              <Tooltip/>




              <Line

                type="monotone"

                dataKey="sales"

                stroke="#0d6efd"

                strokeWidth={4}

              />



            </LineChart>



          </ResponsiveContainer>




        </div>









        {/* CATEGORY PIE */}



        <div className="chart-card">


          <h2>
            Products By Category
          </h2>





          <ResponsiveContainer
            width="100%"
            height={320}
          >



          {

          pieData.length > 0 ? (


            <PieChart>


              <Pie

                data={pieData}

                dataKey="value"

                nameKey="name"

                outerRadius={110}

                label

              >




              {

                pieData.map((item,index)=>(


                  <Cell

                    key={index}

                    fill={
                      COLORS[index % COLORS.length]
                    }

                  />


                ))

              }



              </Pie>




              <Tooltip/>


            </PieChart>


          )


          :


          (

            <h3>
              No Category Data
            </h3>

          )


          }



          </ResponsiveContainer>




        </div>





      </div>





    </div>

  );


};



export default Dashboard;