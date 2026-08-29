const packageMap = {
  comet: process.env.TEBEX_COMET_PACKAGE_ID,
  nova: process.env.TEBEX_NOVA_PACKAGE_ID,
  cosmic: process.env.TEBEX_COSMIC_PACKAGE_ID,
  celestial: process.env.TEBEX_CELESTIAL_PACKAGE_ID,

lunar_key_1: "7645706",
  lunar_key_5: "7645716",
  stellar_key_1: "7645710",
  stellar_key_5: "7645720",
  nebula_key_1: "7645711",
  nebula_key_5: "7645721",
  galaxy_key_1: "7645712",
  galaxy_key_5: "7645724",

};

function isValidMinecraftUsername(username) {
  return /^\.?[A-Za-z0-9_]{3,16}$/.test(username);
}

export async function POST(request) {
  try {
    const { rank, username } = await request.json();

    const packageId = packageMap[rank];

    if (!packageId) {
      return Response.json(
        {
          error: "Invalid rank selected.",
          details: {
            rank,
            validRanks: Object.keys(packageMap),
          },
        },
        { status: 400 }
      );
    }

    if (!username || !isValidMinecraftUsername(username)) {
      return Response.json(
        {
          error:
            "Please enter a valid Minecraft username. Usernames must be 3-16 characters and can only use letters, numbers, and underscores.",
        },
        { status: 400 }
      );
    }

    const token = process.env.TEBEX_WEBSTORE_TOKEN;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!token) {
      return Response.json(
        {
          error: "Missing Tebex webstore token.",
          details: "Add TEBEX_WEBSTORE_TOKEN to .env.local.",
        },
        { status: 500 }
      );
    }

    console.log("Creating Tebex basket for:", {
      rank,
      packageId,
      username,
      siteUrl,
    });

    const basketResponse = await fetch(
      `https://headless.tebex.io/api/accounts/${token}/baskets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complete_url: `${siteUrl}/store/success`,
          cancel_url: `${siteUrl}/store`,
          complete_auto_redirect: true,
          username,
          custom: {
            rank,
            username,
          },
        }),
      }
    );

    const basketJson = await basketResponse.json();

    if (!basketResponse.ok) {
      console.error("Tebex basket creation failed:", basketJson);

      return Response.json(
        {
          error: "Failed to create Tebex basket.",
          details: basketJson,
        },
        { status: 500 }
      );
    }

    const basket = basketJson.data;
    const basketIdent = basket?.ident;

    if (!basketIdent) {
      console.error("Missing basket ident:", basketJson);

      return Response.json(
        {
          error: "Tebex did not return a basket identifier.",
          details: basketJson,
        },
        { status: 500 }
      );
    }

    console.log("Created Tebex basket:", basketIdent);

    const addPackageResponse = await fetch(
      `https://headless.tebex.io/api/baskets/${basketIdent}/packages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          package_id: Number(packageId),
          quantity: 1,
        }),
      }
    );

    const addPackageJson = await addPackageResponse.json();

    if (!addPackageResponse.ok) {
      console.error("Tebex add package failed:", addPackageJson);

      return Response.json(
        {
          error: "Failed to add package to Tebex basket.",
          details: addPackageJson,
        },
        { status: 500 }
      );
    }

    const checkoutUrl =
      addPackageJson?.data?.links?.checkout ||
      addPackageJson?.links?.checkout ||
      basket?.links?.checkout;

    if (!checkoutUrl) {
      console.error("Missing checkout URL:", {
        basketJson,
        addPackageJson,
      });

      return Response.json(
        {
          error: "Tebex did not return a checkout URL.",
          details: {
            basketJson,
            addPackageJson,
          },
        },
        { status: 500 }
      );
    }

    console.log("Tebex checkout URL created:", checkoutUrl);

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout route crashed:", error);

    return Response.json(
      {
        error: "Something went wrong while creating checkout.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}