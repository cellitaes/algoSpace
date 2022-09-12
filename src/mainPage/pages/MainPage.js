import CategoriesList from '../components/CategoriesList';
import LanguagesList from '../components/LanguagesList';
import Sky from '../components/Sky';
import Welcome from '../components/Welcome';

const MainPage = () => {
   return (
      <>
         <Sky />
         <Welcome />
         <CategoriesList />
         <LanguagesList />
      </>
   );
};

export default MainPage;
