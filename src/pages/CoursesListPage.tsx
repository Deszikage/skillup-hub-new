import Navbar from "@/components/Navbar";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";

const CoursesListPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <CoursesSection />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesListPage;
