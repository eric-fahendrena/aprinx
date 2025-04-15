import { Link } from "react-router-dom"
import Header from "./commons/Header"
import { Helmet } from "react-helmet-async"
import LgScreenContainer from "./commons/LgScreenContainer"

function TermsAndConditionsPage() {
  return (
    <>
      <Helmet>
        <title>Conditions d'utilisation - Aprix Madagascar</title>
      </Helmet>
      
      <Header />

      <div className="md:hidden">
      <div className="px-5 py-5">
          <h1 className="font-[400] text-3xl mb-3">Conditions d'utilisation de Aprix Madagascar</h1>
          <div className="mb-5">Dernière mise à jour : 29 Mars 2025</div>
          <div className="mb-5" id="introduction">
            <h2 className="font-[500] text-[1.2rem] mb-3">1. Introduction</h2>
            <p>
              Bienvenue sur Aprix Madagascar, une plateforme qui facilite l'échange entre les vendeurs de tutoriels vidéo et les acheteurs. En utilisant cette plateforme, vous acceptez les présentes conditions d'utilisation. Veuillez les lire attentivement avant d'utiliser notre service.
            </p>
          </div>
          <div className="mb-5" id="objectifAndAcceptedContent">
            <h2 className="font-[500] text-[1.2rem] mb-3">2. Objectif et contenu accepté</h2>
            <p className="mb-3">
              <strong>Objectif :</strong> Aprix Madagascar facilite l'échange entre le vendeur de tutoriels vidéo et les acheteurs.
            </p>
            <p className="mb-3">
              <strong>Contenus acceptés :</strong> Seulement des tutoriels éducatifs. Les contenus violents, adultes, piratés, fausses formations, escroqueries et autres contenus indésirables ne seront pas acceptés. Le créateur doit publier uniquement du contenu dont il détient les droits.
            </p>
          </div>
          <div className="mb-3">
            <h2 className="font-[500] text-[1.2rem] mb-3">3. Conditions d’accès et d’utilisation</h2>
            <p className="mb-3">
              <strong>Âge minimum requis :</strong> Aucune limite d’âge.
            </p>
            <p className="mb-3">
              <strong>Création et gestion des comptes :</strong> L'inscription est obligatoire pour acheter ou vendre. Les vendeurs sont choisis par l'administrateur. La suppression de compte doit être demandée à l'administrateur via un formulaire dans l'application.
            </p>
            <p className="mb-3">
              <strong>Restrictions :</strong> L'inscription se fait uniquement via un compte Google. Il est interdit de partager son compte avec d'autres utilisateurs. L'utilisateur peut être banni s'il ne respecte pas les règles.
            </p>
            <p className="mb-3">
              <strong>Contenu publié par les vendeurs :</strong> Les vendeurs sont responsables du contenu qu'ils publient. Si un contenu inapproprié est signalé, il sera immédiatement supprimé par l'administrateur.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">4. Vente et achat de tutoriels</h2>
            <p className="mb-3">
              <strong>Méthodes de paiement :</strong> Les paiements se font exclusivement via Mobile Money.
            </p>
            <p className="mb-3">
              <strong>Gestion des transactions :</strong> Les paiements passent directement du client au vendeur. Aprix Madagascar ne gère pas directement les transactions financières.
            </p>
            <p className="mb-3">
              <strong>Preuve d’achat :</strong> L'acheteur doit envoyer une preuve de transaction. Le vendeur doit confirmer la transaction. En cas de retard, l'acheteur est invité à contacter directement le vendeur.
            </p>
            <p className="mb-3">
              <strong>Remboursements :</strong> Aucun remboursement n'est proposé.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">5. Propriété intellectuelle</h2>
            <p className="mb-3">
              <strong>Droits des vidéos :</strong> Les vendeurs conservent la pleine propriété de leurs vidéos.
            </p>
            <p className="mb-3">
              <strong>Restrictions d’utilisation des vidéos :</strong> Les acheteurs ne peuvent pas télécharger les vidéos. Ils peuvent partager le lien d'achat du cours, mais les personnes qui reçoivent ce lien ne pourront accéder aux vidéos que si elles achètent le cours. La revente des vidéos est interdite.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">6. Gestion des contenus et modération</h2>
            <p className="mb-3">
              <strong>Règles sur les contenus interdits :</strong> Les contenus faussement étiquetés, les escroqueries et les vidéos non originales sont interdits.
            </p>
            <p className="mb-3">
              <strong>Sanctions en cas de non-respect :</strong> En cas de violation de ces règles, le contenu sera immédiatement supprimé, et des sanctions pourront être appliquées au vendeur.
            </p>
            <p className="mb-3">
              <strong>Vidéos associées à un cours :</strong> Les vidéos ajoutées dans un cours doivent être liées et consister en une séquence logique. Si un cours contient plusieurs vidéos (par exemple, 10 vidéos), elles doivent toutes traiter du même sujet et suivre un ordre successif pour garantir une continuité dans l'apprentissage.
            </p>
            <p className="mb-3">
              <strong>Signalement des abus :</strong> Les utilisateurs peuvent contacter l'administrateur via un formulaire pour signaler un contenu inapproprié.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">7. Données personnelles et confidentialité</h2>
            <p className="mb-3">
              <strong>Données collectées :</strong> Nous collectons votre nom, email, numéro de téléphone (pour les vendeurs), photo de profil (via Google), historique d'achats, les vidéos publiées.
            </p>
            <p className="mb-3">
              <strong>Utilisation des données :</strong> Les données sont collectées uniquement pour le bon fonctionnement de la plateforme.
            </p>
            <p className="mb-3">
              <strong>Protection des données :</strong> Bien que nous ne garantissions pas de mesures spécifiques de sécurité, nous nous engageons à ne pas partager vos informations avec des tiers.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">8. Responsabilités et limites de la plateforme</h2>
            <p className="mb-3">
              <strong>Responsabilité sur les transactions :</strong> Aprix Madagascar ne peut être tenu responsable des litiges entre vendeurs et acheteurs.
            </p>
            <p className="mb-3">
              <strong>Disponibilité du service :</strong> La plateforme peut être temporairement indisponible pour des raisons de maintenance ou de problèmes techniques.
            </p>
            <p className="mb-3">
              <strong>Modifications des conditions :</strong> Aprix Madagascar se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les utilisateurs seront informés des modifications via une annonce sur le site.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">9. Abonnements des vendeurs</h2>
            <p className="mb-3">
              <strong>Souscription à l'abonnement :</strong> Afin de publier du contenu sur la plateforme, chaque vendeur doit souscrire à un abonnement.
            </p>
            <p className="mb-3">
              <strong>Période d’essai gratuite :</strong> Les vendeurs bénéficient d’un abonnement gratuit de 30 jours après leur inscription.
            </p>
            <p className="mb-3">
              <strong>Frais d’abonnement :</strong> Après la période d’essai, l'abonnement est facturé à <strong>20% des gains générés par le vendeur sur le site</strong>.
            </p>
            <p className="mb-3">
              <strong>Expiration de l’abonnement :</strong> Si l’abonnement expire, les contenus publiés par le vendeur deviennent invisibles et le vendeur ne pourra plus publier de nouveaux contenus jusqu'à ce que l’abonnement soit renouvelé.
            </p>
          </div>

          <div className="mt-10 mb-5">
            <p className="mb-3 italic">
              En utilisant cette plateforme, vous acceptez les termes décrits ci-dessus. Si vous avez des questions, n'hésitez pas à nous contacter via le formulaire disponible sur l’application.
            </p>
          </div>
        </div>
      </div>

      <LgScreenContainer>
        <div className="px-5 py-5">
          <h1 className="font-[500] text-xl mb-3">Conditions d'utilisation de Aprix Madagascar</h1>
          <div className="mb-5">Dernière mise à jour : 29 Mars 2025</div>
          <div className="mb-5" id="introduction">
            <h2 className="font-[500] text-[1.2rem] mb-3">1. Introduction</h2>
            <p>
              Bienvenue sur Aprix Madagascar, une plateforme qui facilite l'échange entre les vendeurs de tutoriels vidéo et les acheteurs. En utilisant cette plateforme, vous acceptez les présentes conditions d'utilisation. Veuillez les lire attentivement avant d'utiliser notre service.
            </p>
          </div>
          <div className="mb-5" id="objectifAndAcceptedContent">
            <h2 className="font-[500] text-[1.2rem] mb-3">2. Objectif et contenu accepté</h2>
            <p className="mb-3">
              <strong>Objectif :</strong> Aprix Madagascar facilite l'échange entre le vendeur de tutoriels vidéo et les acheteurs.
            </p>
            <p className="mb-3">
              <strong>Contenus acceptés :</strong> Seulement des tutoriels éducatifs. Les contenus violents, adultes, piratés, fausses formations, escroqueries et autres contenus indésirables ne seront pas acceptés. Le créateur doit publier uniquement du contenu dont il détient les droits.
            </p>
          </div>
          <div className="mb-3">
            <h2 className="font-[500] text-[1.2rem] mb-3">3. Conditions d’accès et d’utilisation</h2>
            <p className="mb-3">
              <strong>Âge minimum requis :</strong> Aucune limite d’âge.
            </p>
            <p className="mb-3">
              <strong>Création et gestion des comptes :</strong> L'inscription est obligatoire pour acheter ou vendre. Les vendeurs sont choisis par l'administrateur. La suppression de compte doit être demandée à l'administrateur via un formulaire dans l'application.
            </p>
            <p className="mb-3">
              <strong>Restrictions :</strong> L'inscription se fait uniquement via un compte Google. Il est interdit de partager son compte avec d'autres utilisateurs. L'utilisateur peut être banni s'il ne respecte pas les règles.
            </p>
            <p className="mb-3">
              <strong>Contenu publié par les vendeurs :</strong> Les vendeurs sont responsables du contenu qu'ils publient. Si un contenu inapproprié est signalé, il sera immédiatement supprimé par l'administrateur.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">4. Vente et achat de tutoriels</h2>
            <p className="mb-3">
              <strong>Méthodes de paiement :</strong> Les paiements se font exclusivement via Mobile Money.
            </p>
            <p className="mb-3">
              <strong>Gestion des transactions :</strong> Les paiements passent directement du client au vendeur. Aprix Madagascar ne gère pas directement les transactions financières.
            </p>
            <p className="mb-3">
              <strong>Preuve d’achat :</strong> L'acheteur doit envoyer une preuve de transaction. Le vendeur doit confirmer la transaction. En cas de retard, l'acheteur est invité à contacter directement le vendeur.
            </p>
            <p className="mb-3">
              <strong>Remboursements :</strong> Aucun remboursement n'est proposé.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">5. Propriété intellectuelle</h2>
            <p className="mb-3">
              <strong>Droits des vidéos :</strong> Les vendeurs conservent la pleine propriété de leurs vidéos.
            </p>
            <p className="mb-3">
              <strong>Restrictions d’utilisation des vidéos :</strong> Les acheteurs ne peuvent pas télécharger les vidéos. Ils peuvent partager le lien d'achat du cours, mais les personnes qui reçoivent ce lien ne pourront accéder aux vidéos que si elles achètent le cours. La revente des vidéos est interdite.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">6. Gestion des contenus et modération</h2>
            <p className="mb-3">
              <strong>Règles sur les contenus interdits :</strong> Les contenus faussement étiquetés, les escroqueries et les vidéos non originales sont interdits.
            </p>
            <p className="mb-3">
              <strong>Sanctions en cas de non-respect :</strong> En cas de violation de ces règles, le contenu sera immédiatement supprimé, et des sanctions pourront être appliquées au vendeur.
            </p>
            <p className="mb-3">
              <strong>Vidéos associées à un cours :</strong> Les vidéos ajoutées dans un cours doivent être liées et consister en une séquence logique. Si un cours contient plusieurs vidéos (par exemple, 10 vidéos), elles doivent toutes traiter du même sujet et suivre un ordre successif pour garantir une continuité dans l'apprentissage.
            </p>
            <p className="mb-3">
              <strong>Signalement des abus :</strong> Les utilisateurs peuvent contacter l'administrateur via un formulaire pour signaler un contenu inapproprié.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">7. Données personnelles et confidentialité</h2>
            <p className="mb-3">
              <strong>Données collectées :</strong> Nous collectons votre nom, email, numéro de téléphone (pour les vendeurs), photo de profil (via Google), historique d'achats, les vidéos publiées.
            </p>
            <p className="mb-3">
              <strong>Utilisation des données :</strong> Les données sont collectées uniquement pour le bon fonctionnement de la plateforme.
            </p>
            <p className="mb-3">
              <strong>Protection des données :</strong> Bien que nous ne garantissions pas de mesures spécifiques de sécurité, nous nous engageons à ne pas partager vos informations avec des tiers.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">8. Responsabilités et limites de la plateforme</h2>
            <p className="mb-3">
              <strong>Responsabilité sur les transactions :</strong> Aprix Madagascar ne peut être tenu responsable des litiges entre vendeurs et acheteurs.
            </p>
            <p className="mb-3">
              <strong>Disponibilité du service :</strong> La plateforme peut être temporairement indisponible pour des raisons de maintenance ou de problèmes techniques.
            </p>
            <p className="mb-3">
              <strong>Modifications des conditions :</strong> Aprix Madagascar se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les utilisateurs seront informés des modifications via une annonce sur le site.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="font-[500] text-[1.2rem] mb-3">9. Abonnements des vendeurs</h2>
            <p className="mb-3">
              <strong>Souscription à l'abonnement :</strong> Afin de publier du contenu sur la plateforme, chaque vendeur doit souscrire à un abonnement.
            </p>
            <p className="mb-3">
              <strong>Période d’essai gratuite :</strong> Les vendeurs bénéficient d’un abonnement gratuit de 30 jours après leur inscription.
            </p>
            <p className="mb-3">
              <strong>Frais d’abonnement :</strong> Après la période d’essai, l'abonnement est facturé à <strong>20% des gains générés par le vendeur sur le site</strong>.
            </p>
            <p className="mb-3">
              <strong>Expiration de l’abonnement :</strong> Si l’abonnement expire, les contenus publiés par le vendeur deviennent invisibles et le vendeur ne pourra plus publier de nouveaux contenus jusqu'à ce que l’abonnement soit renouvelé.
            </p>
          </div>

          <div className="mt-10 mb-5">
            <p className="mb-3 italic">
              En utilisant cette plateforme, vous acceptez les termes décrits ci-dessus. Si vous avez des questions, n'hésitez pas à nous contacter via le formulaire disponible sur l’application.
            </p>
          </div>
        </div>
      </LgScreenContainer>
    </>
  )
}

export default TermsAndConditionsPage
