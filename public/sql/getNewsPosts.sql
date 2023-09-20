SELECT np.id, i.image, i.alt, np.title, np.datePosted, np.body
FROM newsposts np
LEFT OUTER JOIN images i ON np.image = i.id