import HeadeAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import Consultas from "../components/Consultas";
import HeaderAdmin from "../components/HeaderAdmin";

const IndexConsultas = () => {
    return(
    <div className="min-h-screen">
      <HeaderAdmin/>
      <main>
        <Consultas />
      </main>
      <Footer />
    </div>
    )
}

export default IndexConsultas;